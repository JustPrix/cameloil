import React , {useState, useEffect}from "react";
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
  UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";

export default function Ababstecimnto (){
  const [abastecimento, setAbastecimento] = useState([]);
 // const [isLoading, setiIsLoading] = useState(true);   
      
  useEffect(() => {
    getAbastecimento();
  }, []);

  const getAbastecimento = async () =>{
    const response = await axios.get(baseUrl+"refuel/all");
    console.log(response.data.content)
    setAbastecimento(response.data.content);
  }

  const deleteAbastecimento = async (data) =>{ 
    let result = await confirm({
      title: (
          <>
              Remover o Abastecimento?
          </>
      ),
      message: 'Tem a certeza de que deseja remover o item selecionado?',
      confirmText: "Sim",
      cancelText: "Nao",
      confirmColor: 'primary',
      cancelColor: 'link text-danger'
  });
  if(result){
    await axios.get(baseUrl+"refuel/delete/"+data);
    getAbastecimento();
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
                  <CardTitle tag="h4">Lista de Abastecimento</CardTitle>
                 
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary" >
                      <tr>
                        <th>Cartao</th>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Qtd(L)</th>
                        <th>Bonus	ant</th>
                        <th>Bonus	act</th>
                        <th>Data</th>
                        <th>Bombeiro</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {abastecimento.map((a) => {
                        
                        return (
                          <tr key={a.refuelId}>                           
                             <td>{a.card.number}</td>
                             <td>{a.product.name}</td>
                             <td>{a.amount}</td>
                             <td>{a.quantity}</td>
                             <td>{a.previousbonus}</td>
                             <td>{a.actualbonus}</td>                              
                             <td>{a.createdDate}</td>
                             <td>{a.user}</td>
                             <td>
                                <UncontrolledButtonDropdown>
                                  <DropdownToggle caret color="secondary" size="sm">
                                  Ações
                                  </DropdownToggle>
                                  <DropdownMenu>                  
                                    <DropdownItem onClick={() => deleteAbastecimento(a.refuelId)}>Remover</DropdownItem>
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

