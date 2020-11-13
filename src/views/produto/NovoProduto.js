import React, {useState, useEffect} from "react";
import axios from "axios";
import { baseUrl } from "variables/general";
// reactstrap components
import {
  Card, Button,
  CardBody, CardHeader,
  FormGroup, Label,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useParams } from "react-router";

export default function NovoProduto (props){
  const [settings, setSettings] = useState([]);
  const [produto, setProduto] = useState({
    "productId":"",
    "name":"",
    "price":"",
    "settings": {
      "settingsId":""
    }
  });
  const [errors, setErrors] = useState([]);
  const {productId} = useParams();

  const cancelar = () => props.history.goBack();

  useEffect(() => {
    getSettings();
    if(productId !== 0){
      getProduto(productId);
    }
  },[productId]);

  const getSettings = async () =>{  
    const response = await axios.get(baseUrl+"settings/all");
    setSettings(response.data.content);
  }

  const getProduto = async (produtoId) =>{
    const response = await axios.get(baseUrl+"product/find/"+produtoId);
    console.log(response.data);
    setProduto(response.data); 
  }

  const save = () =>{
    let prod = {
      "productId": produto.productId,
      "name": produto.name,
      "price": produto.price,
      "settings": produto.settings
    }
    console.log(prod);
    setErrors([]);
    axios.post(baseUrl+"product/save", prod).then(
      res => { 
          console.log(res.data);
          props.history.goBack();          
      }
    ).catch(err => {
      if(err.response){       
        console.log(err.response.data)
        setErrors(err.response.data);
      }else if(err.request){
        console.log(err.request)
      }else if(err.message){
        console.log(err.message)
      }          
    })
  }
  const handleChange = e => {
    const {name, value} = e.target;
    console.log(name +" : "+ value)
    setProduto(prevState =>({
      ...prevState, [name]: value
    }));
  }
  const handleSelectChange = e => {
    const {name, value} = e.target;
    console.log(name +" : "+ value)
    setProduto(prevState =>({
      ...prevState, [name]: {"settingsId" : value}
    }));
  }

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Novo Produto</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="3">
                        <FormGroup>
                          <label>Nome do Produto</label>
                          <Input
                            name="name"
                            value={produto.name || ''}
                            placeholder="Nome"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.name}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Preço</label>
                          <Input
                            name="price"
                            value={produto.price || ''}
                            placeholder="0.0"
                            type="number"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.price}</Label>
                        </FormGroup>                        
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <label>Localização</label>
                          <Input type="select" name="settings" id="settings" value={produto.settings && produto.settings.settingsId}
                          onChange={handleSelectChange}>
                            <option>Selecione a localização</option>
                          {settings.map((s) => {
                            return (
                              <option  key={s.settingsId} value={s.settingsId}>
                                {s.name}
                              </option>
                            );
                          })}
                          </Input>
                          <Label style={{color: "red"}}>{errors.settings}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="1">
                      <Button color="info" onClick={save}>
                        Gravar
                      </Button>
                    </Col>
                    <Col md="1">
                      <Button color="warning" onClick={cancelar}>
                        Cancelar
                      </Button>
                    </Col>
                      
                    </Row>
                  </Form>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}
