import React , {useState, useEffect}from "react";
import {useSelector} from "react-redux";
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

export default function NovoGrupoBonus (props){
  const [grupoBonus, setGrupoBonus] = useState({
    "grupoBonusId": "",
    "name":"",
    "bonus": "",
    "status": false,
    "user": "",
  })
  const [errors, setErrors] = useState([]);
  const {grupoBonusId} = useParams();
  const user = useSelector((state) =>   state.auth.user);

  const cancelar = () => props.history.goBack();

  useEffect(() => {
    if(grupoBonusId !== 0){
      getGrupoBonus(grupoBonusId);
    }
  }, [grupoBonusId]);

  const getGrupoBonus = async (grupoBonusId) =>{
    const response = await axios.get(baseUrl+"grupobonus/find/"+grupoBonusId);
    console.log(response.data)
    setGrupoBonus(response.data); 
  }

  const handleChange = e => {
    const {name, value} = e.target;
    console.log(name +" : "+ value)
    
    setGrupoBonus(prevState =>({
      ...prevState, [name]: value,
    }));
  }

  const handleChecboxChange = e => {
    const {name, checked} = e.target;
    console.log(name +" : "+ checked)
    setGrupoBonus(prevState =>({
      ...prevState, [name]: checked
    }));
  }

  const save = () =>{
    const object ={
      "grupoBonusId": grupoBonus.grupoBonusId,
      "name": grupoBonus.name,
      "bonus": grupoBonus.bonus,
      "status": grupoBonus.status,
      "user": user.fullName,
    }
    console.log(object)
    setErrors([]);
    axios.post(baseUrl+"grupobonus/save", object).then(
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
                  <h5 className="title">Novo</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Nome</label>
                          <Input
                            name="name"
                            value={grupoBonus.name || ""}
                            placeholder="Nome"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.name}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Bonus</label>
                          <Input
                            name="bonus"
                            value={grupoBonus.bonus || ""}
                            placeholder="Bonus"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.address}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      
                    <Col md="3">
                    <FormGroup>
                          <label>Status</label>
                    <InputGroup>
                        
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <Input name="status" checked={grupoBonus && grupoBonus.status === true} value={grupoBonus && grupoBonus.status} addon type="checkbox" aria-label="check box do status"
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
