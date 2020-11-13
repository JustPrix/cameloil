import React, {useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle, Table, 
  Row, Col, Button,
   UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "variables/general";
import confirm from "reactstrap-confirm";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

export default function Bombeiros () {
  
  const [grupoBonus, setGrupoBonus] = useState([]);
  const history = useHistory(); 
  useEffect(() => {
    getBombeiros();
  }, []);

  const getBombeiros = async () =>{
    const response = await axios.get(baseUrl+"grupobonus/all");
    console.log(response.data.content)
    setGrupoBonus(response.data.content);
  }

  const redirectToNovo = useCallback(() => history.push("/admin/novogrupobonus/0"), [
    history,
  ]);

  const deleteBombeiro = async (data) =>{ 
    let result = await confirm({
      title: (
          <>
              Remover o bombeiro?
          </>
      ),
      message: 'Tem a certeza de que deseja remover o item selecionado?',
      confirmText: "Sim",
      cancelText: "Nao",
      confirmColor: 'primary',
      cancelColor: 'link text-danger'
  });
  if(result){
    await axios.get(baseUrl+"user/delete/"+data);
    getBombeiros();
  }
  }

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Lista Grupo Bonus</CardTitle>
                  <Button color="info" onClick={redirectToNovo}>
                    Novo
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nome</th>
                        <th>Bonus</th>
                        <th>Criado por</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {grupoBonus && grupoBonus.map((g) => {
                        return (
                          <tr key={g.grupoBonusId}>
                            
                             <td>{g.name}</td>
                             <td>{g.bonus}</td>
                             <td>{g.user}</td>
                             <td><Button color={g.status === true ? "success" : "danger"} size="sm"> 
                              {g.status === true ? "Activo" : "Inactivo"}
                              </Button>
                             </td>
                             <td>
                                <UncontrolledButtonDropdown className="sucess">
                                  <DropdownToggle caret size="sm">
                                  Ações
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => history.push("/admin/novogrupobonus/"+g.grupoBonusId)}>Editar</DropdownItem>
                                    <DropdownItem>Desactivar</DropdownItem>
                                    <DropdownItem onClick={() => deleteBombeiro(g.grupoBonusId)}>Remover</DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledButtonDropdown>
                              </td>
                            
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </>
    );
}

