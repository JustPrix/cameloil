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

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

export default function Clientes (){
  const [clientes, setClientes] = useState([]);
 // const [isLoading, setiIsLoading] = useState(true);
  const history = useHistory();    
      
  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () =>{
    const response = await axios.get(baseUrl+"company/all");
    setClientes(response.data.content);
  }

  const redirectToNovoCliente = useCallback(() => history.push("/admin/novocliente/0"), [
    history,
  ]);

  const deleteCliente = async (data) =>{ 
    let result = await confirm({
      title: (
          <>
              Remover o cliente?
          </>
      ),
      message: 'Tem a certeza de que deseja remover o item selecionado?',
      confirmText: "Sim",
      cancelText: "Nao",
      confirmColor: 'primary',
      cancelColor: 'link text-danger'
  });
  if(result){
    await axios.get(baseUrl+"company/delete/"+data);
    getClientes();
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
                  <CardTitle tag="h4">Lista de clientes</CardTitle>
                  <Button color="info" onClick={redirectToNovoCliente}>
                    Novo
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table responsive size="sm">
                    <thead className="text-primary">
                      <tr>
                        <th>Cliente</th>
                        <th>Endereco</th>
                        <th>Contacto</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientes.map((c) => {
                        return (
                          <tr key={c.companyId}>
                            
                             <td>{c.name}</td>
                             <td>{c.address}</td>
                             <td>{c.contact}</td>
                             <td>{c.email}</td>
                             <td><Button color={c.status === true ? "success" : "danger"} size="sm"> 
                              {c.status === true ? "Activo" : "Inactivo"}
                              </Button>
                             </td>
                             <td><Button key={c.company_id} color="info" size="sm" 
                             onClick={() => history.push("/admin/perfilcliente/"+c.companyId)}>
                                Perfil
                                </Button>
                                <UncontrolledButtonDropdown>
                                  <DropdownToggle caret size="sm">
                                    Relatórios
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem>Abastecimentos</DropdownItem>
                                    <DropdownItem>Atribuições</DropdownItem>
                                    <DropdownItem>Compras</DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledButtonDropdown>
                                <UncontrolledButtonDropdown>
                                  <DropdownToggle caret size="sm">
                                  Ações
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => history.push("/admin/novocliente/"+c.companyId)}>Editar</DropdownItem>
                                    <DropdownItem>Desactivar</DropdownItem>
                                    <DropdownItem onClick={() => deleteCliente(c.companyId)}>Remover</DropdownItem>
                                    <DropdownItem onClick={() => history.push("/admin/novocartao/0/"+c.companyId)}>Criar Cartao</DropdownItem>
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

