import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import {GridLoader} from 'react-spinners';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {updateGraphic} from './../../ducks/reducer';

class Pictures extends Component {
    constructor(props){
        super(props);
        this.state = {
            isUploading: false,
            url: ''
        }
    }

    handleGraphic = (url) => {
        this.props.updateGraphic({graphic: url})
    }

    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
        axios.get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
        })
        .then(response => {
            const { signedRequest, url } = response.data;
            this.uploadFile(file, signedRequest, url);
        })
        .catch(err => {
            console.log(err);
        });
    };

    uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };    
        axios.put(signedRequest, file, options)
        .then(response => {
            this.setState({ isUploading: false, url })
            this.handleGraphic(url)
        })
        .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };
    
    render(){
        const{url, isUploading} = this.state;
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Link to='/customize'><Button bsPrefix='customize-step-btn'>1</Button></Link>
                    <Link to='/board-grip'><Button bsPrefix='customize-step-btn'>2</Button></Link>
                    <Link to='/trucks'><Button bsPrefix='customize-step-btn'>3</Button></Link>
                    <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button></Link>
                    <Button bsPrefix='active-customize-step-btn'>5</Button>
                </ButtonGroup>
                <div className='custom-board-image-div'>
                    <h5 className='custom-step-name'>Graphics</h5>
                </div>
                <div className='custom-board-buttons-div'>
                    <ButtonGroup bsPrefix='custom-btn-group'>
                        <Dropzone
                            onDropAccepted={this.getSignedRequest}
                            accept="image/*"
                            multiple={false}>
                            {({getRootProps, getInputProps}) => (
                            <Button bsPrefix='custom-btn' {...getRootProps()}>
                                <input {...getInputProps()} />
                                {isUploading ? <GridLoader /> : <span>Upload Graphic</span>}
                            </Button>
                        )}
                        </Dropzone>
                        <Button bsPrefix='custom-btn'>Add to Cart</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {graphic, wheels, trucks, grip, design} = reduxState;
    return {
        graphic,
        wheels,
        trucks,
        grip,
        design
    }
}

const mapDispatchToProps = {
    updateGraphic
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);