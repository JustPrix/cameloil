import React , {useState, useCallback, useEffect}from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "variables/general";
import confirm from "reactstrap-confirm";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle, Table, 
  Row, Col,
  Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";

export default function Produtos (){
  const [pos, setPos] = useState([]);
 // const [isLoading, setiIsLoading] = useState(true);
  const history = useHistory();    
      
  useEffect(() => {
    getPos();
  }, []);

  const getPos = async () =>{
    const response = await axios.get(baseUrl+"pos/all");
    console.log(response.data.content)
    setPos(response.data.content);
  }

  const redirectToNovoPos = useCallback(() => history.push("/admin/novopos/0"), [
    history,
  ]);

  const deletePos = async (data) =>{ 
    let result = await confirm({
      title: (
          <>
              Remover o pos?
          </>
      ),
      message: 'Tem a certeza de que deseja remover o item selecionado?',
      confirmText: "Sim",
      cancelText: "Nao",
      confirmColor: 'primary',
      cancelColor: 'link text-danger'
  });
  if(result){
    await axios.get(baseUrl+"pos/delete/"+data);
    getPos();
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
                  <CardTitle tag="h4">Lista de Pos</CardTitle>
                  <Button color="info" onClick={redirectToNovoPos}>
                    Novo
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Numero</th>
                        <th>Localização</th>
                        <th>Bonus	</th>
                        <th>Data de Criação</th>
                        <th>Data de Modificação</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pos.map((p) => {
                        
                        return (
                          <tr key={p.posId}>                           
                             <td>{p.number}</td>
                             <td>{p.settings.address}</td>
                             <td>{p.grupoBonus.bonus}</td>                             
                             <td>{p.createdDate}</td>
                             <td>{p.modifiedDate}</td>
                             <td><Button color={p.status === true ? "success" : "danger"} size="sm"> 
                              {p.status === true ? "Activo" : "Inactivo"}
                              </Button>
                             </td>
                             <td>
                                <UncontrolledButtonDropdown>
                                  <DropdownToggle caret color="secondary" size="sm">
                                  Ações
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => history.push("/admin/novopos/"+p.posId)}>Editar</DropdownItem>
                                    <DropdownItem onClick={() => deletePos(p.posId)}>Remover</DropdownItem>
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

