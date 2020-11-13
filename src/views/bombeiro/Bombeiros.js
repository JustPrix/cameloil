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
  
  const [bombeiros, setBombeiros] = useState([]);
  const history = useHistory(); 
  useEffect(() => {
    getBombeiros();
  }, []);

  const getBombeiros = async () =>{
    const response = await axios.get(baseUrl+"user/allUsers");
    console.log(response.data.content)
    setBombeiros(response.data.content);
  }

  const redirectToNovoBombeiro = useCallback(() => history.push("/admin/novobombeiro/0"), [
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
                  <CardTitle tag="h4">Lista de Bombeiros</CardTitle>
                  <Button color="info" onClick={redirectToNovoBombeiro}>
                    Novo
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Bombeiro</th>
                        <th>Endereco</th>
                        <th>Contacto</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bombeiros && bombeiros.map((b) => {
                        return (
                          <tr key={b.username}>
                            
                             <td>{b.fullName}</td>
                             <td>{b.address}</td>
                             <td>{b.contact}</td>
                             <td>{b.username}</td>
                             <td><Button color={b.enabled === true ? "success" : "danger"} size="sm"> 
                              {b.enabled === true ? "Activo" : "Inactivo"}
                              </Button>
                             </td>
                             <td>
                                <UncontrolledButtonDropdown className="sucess">
                                  <DropdownToggle caret size="sm">
                                  Ações
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => history.push("/admin/novobombeiro/"+b.username)}>Editar</DropdownItem>
                                    <DropdownItem>Desactivar</DropdownItem>
                                    <DropdownItem onClick={() => deleteBombeiro(b.username)}>Remover</DropdownItem>
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

