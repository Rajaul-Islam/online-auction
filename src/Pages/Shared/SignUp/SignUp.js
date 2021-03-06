import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Nav, Row, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import login from '../image/login.jpg'
import useAuth from '../Authentication/Hook/useAuth';
import AuctioneerNav from '../../Auctioneer/AuctioneerHome/AuctioneerNav';


const SignUp = () => {
    const { allContext, addToCart, selectedProduct } = useAuth()
    const { user, registerUser, isLoading, error, signInWithGoogle } = allContext;

    const navigate = useNavigate();
    const location = useLocation();
    console.log(user);
    const [loginData, setLoginData] = useState('');
    console.log(loginData);
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        console.log(value)
        const newLoginData = { ...loginData };

        newLoginData[field] = value;
        setLoginData(newLoginData);


    }
    const handleLogInSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('password dis not match')
        }
        registerUser(loginData.email, loginData.password, loginData.name, location, navigate)
        e.preventDefault();
    }


    return (
        <div className='mb-5 container-fluid'>
            <AuctioneerNav></AuctioneerNav>
            <Container>
                {isLoading ? <>
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </Button>{' '}
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>
                </> :
                    <Row xs={1} md={2}>
                        <Col >
                            <img className='img-fluid' src={login}>

                            </img>
                        </Col>
                        <Col className="mt-md-5 pt-md-5">


                            <h2 className='brand-title'>Please Signup</h2>
                            <p className="text-warning mt-2">SignUp with gmail & Password</p>
                            <p className="text-danger text-center"></p>
                            <p className="text-danger text-center">{error}</p>




                            <Form
                                onSubmit={handleLogInSubmit}
                            >
                                <Row>
                                    <Col className="text-start">
                                        <Form.Label htmlFor="text" visuallyHidden>
                                            Your Name
                                        </Form.Label>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                            </InputGroup.Text>
                                            <FormControl
                                                onBlur={handleOnBlur}
                                                type='text'
                                                name='name'
                                                autoComplete="current-email"
                                                id="email"
                                                placeholder="Enter Name"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-start">
                                        <Form.Label htmlFor="email" visuallyHidden>
                                            Your Email Address
                                        </Form.Label>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                                            </InputGroup.Text>
                                            <FormControl
                                                onBlur={handleOnBlur}
                                                type="email"
                                                name='email'
                                                autoComplete="current-email"
                                                id="email"
                                                placeholder="Enter your email address"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="text-start">
                                        <Form.Label htmlFor="password" visuallyHidden>
                                            Your Password
                                        </Form.Label>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                            </InputGroup.Text>
                                            <FormControl
                                                onBlur={handleOnBlur}
                                                type="password"
                                                name='password'
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="text-start">
                                        <Form.Label htmlFor="password" visuallyHidden>
                                            Your Password
                                        </Form.Label>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                            </InputGroup.Text>
                                            <FormControl
                                                onBlur={handleOnBlur}
                                                type="password"
                                                name='password2'
                                                autoComplete="current-password"
                                                id="password"
                                                placeholder="Enter your password"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <button type="submit" className="buttons">
                                    SignUp
                                </button>
                            </Form>
                            <p>
                                --------------------------------

                            </p>
                            <Nav.Link className='text-warning' as={Link} to='/login'>Already have an account? please login</Nav.Link>
                           
                            <p className='brand-title'>SignUp with google</p>
                            <Button className="text-warning" style={{ backgroundColor: '#f1f1f1' }} onClick={() => signInWithGoogle(location, navigate)}>SignUp With</Button>


                            {user?.email && <Alert variant='success' className='w-25 mx-auto ' >
                                User Register successfully
                            </Alert>}
                        </Col>

                    </Row>
                }
            </Container>
        </div>
    );
};

export default SignUp;