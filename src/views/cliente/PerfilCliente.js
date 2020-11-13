import React , {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import confirm from "reactstrap-confirm";
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
import { useParams } from "react-router";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

export default function PerfilCliente () {
  const [cartoes, setCartoes] = useState([]);
  const {companyId} = useParams();  
  const history = useHistory(); 
  useEffect(() => {
    getCartoes(companyId);
  }, [companyId]);

  const getCartoes = async (companyId) =>{
    const response = await axios.get(baseUrl+"card/findByCompany?companyId="+companyId);
    console.log(response.data.content);
    setCartoes(response.data.content);
  }

  const deleteCartao = async (data) =>{ 
    let result = await confirm({
      title: (
          <>
              Remover o cartao?
          </>
      ),
      message: 'Tem a certeza de que deseja remover o item selecionado?',
      confirmText: "Sim",
      cancelText: "Nao",
      confirmColor: 'primary',
      cancelColor: 'link text-danger'
  });
  if(result){
    await axios.get(baseUrl+"card/delete/"+data);
    getCartoes(companyId);
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
                  <CardTitle tag="h4">Lista de cartoes</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Numero</th>
                        <th>Motorista</th>
                        <th>Saldo</th>
                        <th>Bonus</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartoes && cartoes.map((c) => {
                        return (
                          <tr key={c.cardId}>
                            
                             <td>{c.number}</td>
                             <td>{c.address}</td>
                             <td>{c.balance.toLocaleString("de-DE", {maximumFractionDigits:2})}</td>
                             <td>{c.bonus.toLocaleString("de-DE", {maximumFractionDigits:2})}</td>
                             <td><Button color={c.status === true ? "success" : "danger"} size="sm"> 
                              {c.status === true ? "Activo" : "Inactivo"}
                              </Button>
                             </td>
                             <td>
                                <UncontrolledButtonDropdown className="sucess">
                                  <DropdownToggle caret size="sm">
                                  Ações
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => history.push("/admin/novocartao/"+c.cardId+"/0")}>Editar</DropdownItem>
                                    <DropdownItem>Desactivar</DropdownItem>
                                    <DropdownItem onClick={() => deleteCartao(c.cardId)}>Remover</DropdownItem>
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

