import React, {useState, useEffect} from "react";
import axios from "axios";
import { baseUrl } from "variables/general";
// reactstrap components
import {
  Card, Button,
  CardBody, CardHeader,
  FormGroup,InputGroup,
  Form,Input, Label,
  Row, Col, InputGroupAddon, InputGroupText,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useParams } from "react-router";

export default function NovoProduto (props){
  const [settings, setSettings] = useState([]);
  const [pos, setPos] = useState({
    "posId":"",
    "number":"",
    "status":false,
    "settings": {
      "settingsId":""
    },
    "grupoBonus":{"grupoBonusId" : ""},
  });
  const [grupoBonus, setGrupoBonus] = useState([]);
  const [errors, setErrors] = useState([]);
  const {posId} = useParams();
  const cancelar = () => props.history.goBack();


  useEffect(() => {
    getSettings();
    if(posId !== 0){
      getPos(posId);
    }
  }, [posId]);

  const getPos = async (posId) =>{
    const response = await axios.get(baseUrl+"pos/find/"+posId);
    console.log(response.data);
    setPos(response.data); 
  }

  const getSettings = async () =>{
    const response = await axios.get(baseUrl+"settings/all");
    const responsegrupoBonus = await axios.get(baseUrl+"grupobonus/all");
    setSettings(response.data.content);
    setGrupoBonus(responsegrupoBonus.data.content);
  }

  const save = (data) =>{
    axios.post(baseUrl+"pos/save", data).then(
      res => { 
          console.log(res.data);
          props.history.goBack();          
      }
  ).catch(err => {
      console.log(err.response.data)
      setErrors(err.response.data);
  })
  }

  const submit = () =>{
    const object = {
      "posId": pos.posId,
      "number": pos.number,
      "grupoBonus": pos.grupoBonus,
      "status": pos.status,
      "settings": pos.settings,
    }
    console.log(object);
    save(object);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setPos(prevState =>({
      ...prevState, [name]: value,
    }));
  }

  const handleChecboxChange = e => {
    const {name, checked} = e.target;
    setPos(prevState =>({
      ...prevState, [name]: checked
    }));
  }

  const handleSelectChange = e => {
    const {name, value} = e.target;   
    setPos(prevState =>({
       ...prevState, [name]: {"settingsId" : value}
    }));
  }

  const handleSelectChangeGrupoBonus = e => {
    const {name, value} = e.target;  
    console.log(name + " : "+ value) 
    setPos(prevState =>({
       ...prevState, [name]: {"grupoBonusId" : value}
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
                  <h5 className="title">Criar Pos</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Numero do Pos</label>
                          <Input
                            name="number"
                            value={pos.number || ""}
                            placeholder="0000000"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.number}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Grupo Bonus</label>
                          <Input type="select" name="grupoBonus" value={pos.grupoBonus && pos.grupoBonus.grupoBonusId}
                          onChange={handleSelectChangeGrupoBonus}>
                            <option>Selecione o grupo bonus</option>
                            {grupoBonus.map((g) => {
                              return (
                              <option key={g.grupoBonusId} value={g.grupoBonusId}>
                                {g.name}
                              </option>
                            );
                          })}
                          </Input>
                          <Label style={{color: "red"}}>{errors.grupoBonus}</Label>
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <Row>
                    <Col md="4">
                    <FormGroup>
                          <label>Status</label>
                    <InputGroup>
                        
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <Input name="status" checked={pos && pos.status === true} value={pos && pos.status} addon type="checkbox" aria-label="check box do status"
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
                          <label>Localização</label>
                          <Input type="select" name="settings" id="settings" value={pos.settings && pos.settings.settingsId}
                          onChange={handleSelectChange}>
                            <option>Selecione a localização</option>
                            {settings.map((s) => {
                              return (
                              <option key={s.settingsId} value={s.settingsId}>
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
                      <Button color="info" onClick={submit}>
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
