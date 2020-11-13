import React from "react";
import { connect } from "react-redux";
import {loginAction} from "action/loginAction.js";
import {addFlashMessage} from "action/flashMessages.js";
import {Input, CardBody,
    FormGroup, Row, Col,
    Form, Card, Button, Label, Spinner, CardHeader,
  } from "reactstrap";
import validateInput from "validations/loginValidator";
import FlashMessageList from "components/Flash/FlashMessageList";
  

class Login extends React.Component {

    constructor(props){
      super(props);
        this.state = {
          username: "",
          password: "",
          errors:{},
          isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isValid(){
      const {errors, isValid} = validateInput(this.state);
      if(!isValid){
        this.setState({errors});
      }
      return isValid;
    }

    onSubmit(e){
      e.preventDefault();     
      if(this.isValid()){
        this.setState({errors:{}, isLoading: true });
        this.props.loginAction(this.state).then(
          (res) => {
            this.props.addFlashMessage({
              type: "success",
              text: "Bem vindo"
            });
            
            this.props.history.push("/admin/dashboard");
          },
          (err) => {
            console.log(err.response.data.message);
            this.props.addFlashMessage({
              type: "error",
              text: err.response.data.message
            });
            this.setState({errors : err, isLoading: false})}
        );
      }
    }

    onChange(e){
      let field = e.target.name;
      let value = e.target.value;
      this.setState({...this.state, [field]: value});
    }

    render() {
      const {errors, isLoading} = this.state;
      return (
        <>
        {!this.state.isLoadind ? <div className="wrapper">
        <div className="content">
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Card >
              <CardHeader>
              <FlashMessageList/>
              </CardHeader>
              <CardBody>
                  <Form className="form" onSubmit={this.onSubmit}>
                    <Row className="justify-content-md-center">
                      <Col className="px-2" md="5">
                        <FormGroup>
                        <label>Username</label>
                          <Input
                            name="username"
                            value={this.state.username}
                            placeholder="Username"
                            type="text"
                            onChange={this.onChange}
                          />
                          <Label style={{color: "red"}}>{errors.username}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      
                      <Col className="px-2" md="5">
                        <FormGroup>
                        <label>Password</label>
                          <Input
                            name="password"
                            value={this.state.password}
                            placeholder="Password"
                            type="password"
                            onChange={this.onChange}
                          />
                          <Label style={{color: "red"}}>{errors.password}</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Button color="primary" disabled={isLoading}>Login</Button>
                    </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          </Row>
          </div>
          
          </div> : <Spinner><span className="sr-only">Carregando</span></Spinner>}
        </>
      );
    }
}


export default connect(null, {loginAction ,addFlashMessage}) (Login);