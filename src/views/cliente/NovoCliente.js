import React , {useState, useEffect}from "react";
import axios from "axios";
import { baseUrl } from "variables/general";

// reactstrap components
import {
  Card, Button,
  CardBody, CardHeader,
  FormGroup,
  Form,
  Input,
  Row, InputGroup,
  Col, InputGroupAddon,
  Label,InputGroupText, 
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useParams } from "react-router";

export default function NovoCliente (props){
  const [cliente, setCliente] = useState({
    "companyId": "",
    "name": "",
    "address": "",
    "email": "",
    "contact": "",
    "nuit": "",
    "activity": "",
    "discount": "",
    "shareCapital": "",
    "limiteBalance": "",
    "status": true,
    "bonus": "SIM",
    "paymentMethod": {
      "paymentMethodId": ""
    },
  })
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [errors, setErrors] = useState([]);
  const {companyId} = useParams();

  const cancelar = () => props.history.goBack();

  useEffect(() => {
    getPaymentMethods();
    if(companyId !== 0){
      getCliente(companyId);
    }
  }, [companyId]);

  const getPaymentMethods = async () =>{
    const response = await axios.get(baseUrl+"paymentMethod/all");
    setPaymentMethod(response.data.content);
  }

  const getCliente = async (companyId) =>{
    const response = await axios.get(baseUrl+"company/find/"+companyId);
    setCliente(response.data); 
  }

  const handleChange = e => {
    const {name, value} = e.target;
    console.log(name +" : "+ value)
    
    setCliente(prevState =>({
      ...prevState, [name]: value,
    }));
  }

  const handleChecboxChange = e => {
    const {name, checked} = e.target;
    console.log(name +" : "+ checked)
    setCliente(prevState =>({
      ...prevState, [name]: checked
    }));
  }

  const save = () =>{
    const company ={
    "companyId": cliente.companyId,
    "name": cliente.name,
    "address": cliente.address,
    "email": cliente.email,
    "contact": cliente.contact,
    "nuit": cliente.nuit,
    "activity": cliente.activity,
    "discount": cliente.discount,
    "shareCapital": cliente.shareCapital,
    "limiteBalance": cliente.limiteBalance,
    "status": cliente.status,
    "bonus": cliente.bonus,
    "paymentMethod": cliente.paymentMethod
    }
    console.log(company)
    setErrors([]);
    axios.post(baseUrl+"company/save", company).then(
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

  const handleSelectChange = e => {
    const {name, value} = e.target;   
    setCliente(prevState =>({
       ...prevState, [name]: {"paymentMethodId" : value}
    }));
    console.log(cliente.paymentMethod);
  }

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Novo Cliente</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Nome do cliente</label>
                          <Input
                            name="name"
                            value={cliente.name || ""}
                            placeholder="Nome"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.name}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Endereco</label>
                          <Input
                            name="address"
                            value={cliente.address || ""}
                            placeholder="Endereço"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.address}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email
                          </label>
                          <Input name="email" 
                          value={cliente.email || ""}
                          onChange={handleChange}
                          placeholder="Email" 
                          type="email" />
                          <Label style={{color: "red"}}>{errors.email}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Contacto</label>
                          <Input
                            name="contact"
                            value={cliente.contact || ""}
                            placeholder="Contacto"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.contact}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Nuit</label>
                          <Input
                            name="nuit"
                            value={cliente.nuit || ""}
                            placeholder="NUIT"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.nuit}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Actividade</label>
                          <Input
                            name="activity"
                            value={cliente.activity || ""}
                            placeholder="Actividade"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.activicty}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Limite de saldo</label>
                          <Input
                            name="limiteBalance"
                            value={cliente.limiteBalance || ""}
                            placeholder="0"
                            type="number"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.limiteBalance}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Capital Social</label>
                          <Input
                            name="shareCapital"
                            value={cliente.shareCapital || ""}
                            placeholder="0"
                            type="number"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.shareCapital}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Desconto</label>
                          <Input  name="discount"
                                  value={cliente.discount || ""} 
                                  placeholder="0"
                                  type="number" 
                                  onChange={handleChange}
                                  />
                          <Label style={{color: "red"}}>{errors.discount}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup tag="fieldset">
                          <Label>Bonús</Label>
                        <Row>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" checked={cliente.bonus === "SIM"} name="bonus" onChange={handleChange} value="SIM"/>
                            Sim
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                              <Input type="radio" checked={cliente.bonus === "NÃO"} name="bonus" onChange={handleChange} value="NÃO"/>
                              Não
                          </Label>
                        </FormGroup>
                        </Row>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                    <FormGroup>
                          <label>Status</label>
                    <InputGroup>
                        
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <Input name="status" checked={cliente && cliente.status === true} value={cliente && cliente.status} addon type="checkbox" aria-label="check box do status"
                              onChange={handleChecboxChange}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Status"/>
                    </InputGroup>
                    </FormGroup>    
                    </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Metódo de pagamento</label>
                          <Input type="select"  value={cliente.paymentMethod && cliente.paymentMethod.paymentMethodId} 
                          name="paymentMethod" onChange={handleSelectChange}>
                          <option>Selecione o metódo de pagamento</option>
                          {paymentMethod.map((p) => {
                            return (
                              <option  key={p.paymentMethodId} value={p.paymentMethodId}>{p.name}</option>
                            );
                          })}
                          </Input>
                          <Label style={{color: "red"}}>{errors.paymentMethod}</Label>
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
