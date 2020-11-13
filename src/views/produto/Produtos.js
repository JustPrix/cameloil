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

export default function Produtos (){
  const [produtos, setProdutos] = useState([]);
 // const [isLoading, setiIsLoading] = useState(true);
  const history = useHistory();    
      
  useEffect(() => {
    getProdutos();
  }, []);

  const getProdutos = async () =>{
    const response = await axios.get(baseUrl+"product/all");
    setProdutos(response.data.content);
  }

  const redirectToNovoProduto = useCallback(() => history.push("/admin/novoproduto/0"), [
    history,
  ]);

  const deleteProduct = async (data) =>{ 
        let result = await confirm({
          title: (
              <>
                  Remover produdo?
              </>
          ),
          message: 'Tem a certeza de que deseja remover o item selecionado?',
          confirmText: "Sim",
          cancelText: "Nao",
          confirmColor: 'primary',
          cancelColor: 'link text-danger'
      });
      if(result){
        await axios.get(baseUrl+"product/delete/"+data);
        getProdutos();
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
                  <CardTitle tag="h4">Lista de Produtos</CardTitle>
                  <Button color="info" onClick={redirectToNovoProduto}>
                    Novo
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Produto</th>
                        <th>Preço	</th>
                        <th>Localização</th>
                        <th>Data de Criação</th>
                        <th>Data de Modificação	</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {produtos.map((p) => {
                        return (
                          <tr key={p.productId}>                           
                             <td>{p.name}</td>
                             <td>{p.price}</td>
                             <td>{p.settings.address}</td>
                             <td>{p.createdDate}</td>
                             <td>{p.modifiedDate}</td>
                             <td>
                                <UncontrolledButtonDropdown setActiveFromChild>
                                  <DropdownToggle caret color="secondary" size="sm">
                                  Ações
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem onClick={() => history.push("/admin/novoproduto/"+p.productId)}>Editar</DropdownItem>
                                    <DropdownItem onClick={() => deleteProduct(p.productId)}>
                                      Remover
                                    </DropdownItem>
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

