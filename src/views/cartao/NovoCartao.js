import React , {useState, useEffect} from "react";
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

export default function NovoCartao (props){
  const [cartao, setCartao] = useState({
    "cardId": "",
    "number":"",
    "bonus": "",
    "balance":"",
    "status": false,
    "pin": "",
    "company":"",
  })
  const [errors, setErrors] = useState([]);
  const {cardId, companyId} = useParams();
  
  const cancelar = () => props.history.goBack();

  useEffect(() => {
    console.log(companyId)
    if(cardId !== 0){
      getCard(cardId);
    }
  }, [cardId, companyId]);

  const getCard = async (cardId) =>{
    const response = await axios.get(baseUrl+"card/find/"+cardId);
    console.log(response.data)
    setCartao(response.data); 
  }

  const handleChange = e => {
    const {name, value} = e.target;
    console.log(name +" : "+ value)
    
    setCartao(prevState =>({
      ...prevState, [name]: value,
    }));
  }

  const handleChecboxChange = e => {
    const {name, checked} = e.target;
    console.log(name +" : "+ checked)
    setCartao(prevState =>({
      ...prevState, [name]: checked
    }));
  }

  const save = () =>{
    console.log("Company Id : "+companyId)

    let id;
    if(companyId !== "0"){
        id = companyId;
    }else{
        id = cartao.company.companyId;
    }
    
   
    const object ={
      "cardId": cartao.cardId,
      "number": cartao.number,
      "bonus": cartao.bonus,
      "balance": cartao.balance,
      "status": cartao.status,
      "pin": cartao.pin,
      "company": {"companyId": id},
    }
    console.log(object)
    setErrors([]);
    axios.post(baseUrl+"card/save", object).then(
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
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Numero</label>
                          <Input
                            name="number"
                            value={cartao.number || ""}
                            placeholder="Numero"
                            type="text"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.number}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Saldo</label>
                          <Input
                            name="balance"
                            value={cartao.balance || ""}
                            placeholder="Saldo"
                            type="number"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.balance}</Label>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Bonus</label>
                          <Input
                            name="bonus"
                            value={cartao.bonus || ""}
                            placeholder="Bonus"
                            type="number"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.bonus}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col className="px-1" md="3">
                        <FormGroup>
                          <label>PIN</label>
                          <Input
                            name="pin"
                            value={cartao.pin || ""}
                            placeholder="PIN"
                            type="number"
                            onChange={handleChange}
                          />
                          <Label style={{color: "red"}}>{errors.pin}</Label>
                        </FormGroup>
                      </Col>
                      
                    <Col md="3">
                    <FormGroup>
                          <label>Status</label>
                    <InputGroup>
                        
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <Input name="status" checked={cartao && cartao.status === true} value={cartao && cartao.status} addon type="checkbox" aria-label="check box do status"
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
