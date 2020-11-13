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
  const [bombeiro, setBombeiro] = useState({
    "username": "",
    "password":"",
    "fullName": "",
    "address": "",
    "enabled": false,
    "contact": "",
    "roles":{
      "roleId":"2"
    }
  })
  const [errors, setErrors] = useState([]);
  const {username} = useParams();

  const cancelar = () => props.history.goBack();

  useEffect(() => {
    if(username !== 0){
      getBombeiro(username);
    }
  }, [username]);

  const getBombeiro = async (username) =>{
    const response = await axios.get(baseUrl+"user/find/"+username);
    console.log(response.data)
    setBombeiro(response.data); 
  }

  const handleChange = e => {
    const {name, value} = e.target;
    console.log(name +" : "+ value)
    
    setBombeiro(prevState =>({
      ...prevState, [name]: value,
    }));
  }

  const handleChecboxChange = e => {
    const {name, checked} = e.target;
    console.log(name +" : "+ checked)
    setBombeiro(prevState =>({
      ...prevState, [name]: checked
    }));
  }

  const save = () =>{
    const user ={
      "username": bombeiro.username,
      "password": bombeiro.password,
      "fullName": bombeiro.fullName,
      "address": bombeiro.address,
      "contact": bombeiro.contact,
      "enabled": bombeiro.enabled,
      "roles":{
        "roleId":"2"
      }
    }
    
    setErrors([]);
    axios.post(baseUrl+"user/saveUser", user).then(
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


    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Novo Bombeiro</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Nome bombeiro</label>
                          <Input
                            name="fullName"
                            value={bombeiro.fullName || ""}
                            placeholder="Nome Completo"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.fullName}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Endereco</label>
                          <Input
                            name="address"
                            value={bombeiro.address || ""}
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
                          <Input name="username" 
                          value={bombeiro.username || ""}
                          onChange={handleChange}
                          placeholder="Email" 
                          type="email" />
                          <Label style={{color: "red"}}>{errors.username}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            name="password"
                            value={bombeiro.password || ""}
                            placeholder="Password"
                            type="password"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.password}</Label>
                        </FormGroup>
                      </Col>
                    <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Contacto</label>
                          <Input
                            name="contact"
                            value={bombeiro.contact || ""}
                            placeholder="Contacto"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.contact}</Label>
                        </FormGroup>
                      </Col>
                   
                      
                      <Col md="3">
                    <FormGroup>
                          <label>Status</label>
                    <InputGroup>
                        
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <Input name="enabled" checked={bombeiro && bombeiro.enabled === true} value={bombeiro && bombeiro.enabled} addon type="checkbox" aria-label="check box do status"
                              onChange={handleChecboxChange}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Status"/>
                    </InputGroup>
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
