import React, { Component, useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { ParallaxProvider, Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { mdiSignCaution, mdiArrowDownCircleOutline, mdiArrowUpCircleOutline } from '@mdi/js';
import { Button, CircularProgress, Dialog, FormControl, InputLabel, IconButton, MenuItem, Select, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { keyframes } from 'styled-components';
import ScrollIntoView from 'react-scroll-into-view'
import download from 'downloadjs';
import io from 'socket.io-client'
import ss from 'socket.io-stream'
import { fs } from 'fs'

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const testAnimation = keyframes`
    :hover {
        fontSize: 32px;
    }
    0% {
		width: 0%;
		filter: blur(20px);
	}
	100% {
		width: 200px;
		filter: blur(0);
	}
`

const Stream = (props) => {

		const [screenIndex, setScreenIndex] = useState(0)
		const [gettingUATLogs, setGettingUATLogs] = useState(false)
		const [gettingSTGLogs, setGettingSTGLogs] = useState(false)
		const [gettingPRDLogs, setGettingPRDLogs] = useState(false)
		const [redeployingBE, setRedeployingBE] = useState(false)
		const [failed, setFailed] = useState(false)
		const [openSnackbar, setOpenSnackbar] = useState(false)
		const [snackbarMessage, setSnackbarMessage] = useState("")
		const [snackbarSeverity, setSnackbarSeverity] = useState("")
		const [openDialog, setOpenDialog] = useState(false)
        const [deployedSince, setRedeployedSince] = useState(0)

        function testStream() {
            var socket = io.connect('http://localhost/user');
            console.log("connected")
            var stream = ss.createStream();
            console.log("streaming")
            var filename = 'profile.jpg';
            var fs = require('fs')
            
            ss(socket).emit('getAttachment', stream, {name: filename});
            console.log("streaming2")

        }

        function downloadFile(name, originalFilename) {
            var socket = io.connect('http://localhost/user');
            //
        
            //== Create stream for file to be streamed to and buffer to save chunks
            var stream = ss.createStream(),
            fileBuffer = [],
            fileLength = 0;
        
            //== Emit/Request
            ss(socket).emit('getAttachment', stream, name, function (fileError, fileInfo) {
                console.log("Emit. Retrieving file")
                console.log(fileError)
                
                if (fileError) {
                    //console.log("FIle not found")
                } else {
                    console.log("file found")
                    console.log(['File Found!', fileInfo]);
        
                    //== Receive data
                    stream.on('data', function (chunk) {
                        console.log("receiving")
                        fileLength += chunk.length;
                        var progress = Math.floor((fileLength / fileInfo.size) * 100);
                        progress = Math.max(progress - 2, 1);
                        
                        fileBuffer.push(chunk);
                    });
        
                    stream.on('end', function () {
                        console.log("ending")
                        var filedata = new Uint8Array(fileLength),
                        i = 0;
        
                        //== Loop to fill the final array
                        fileBuffer.forEach(function (buff) {
                            for (var j = 0; j < buff.length; j++) {
                                filedata[i] = buff[j];
                                i++;
                            }
                        });
        
                        //== Download file in browser
                        //downloadFileFromBlob([filedata], originalFilename);
        
                        
                    });
                }
            });
            console.log("returning")
            //== Return
            return null;
        }

        return (
            <ParallaxProvider>
            <div style={{ position: 'fixed', top: 10, left: 10, color: '#BDBDBD', zIndex: 100, mixBlendMode: 'difference', fontFamily: 'Black Ops One', fontSize: 28, userSelect: 'none' }}>AA</div>
            {/* <div style={{ position: 'fixed', top: 10, right: 10, color: '#FFFFFF', zIndex: 100, mixBlendMode: 'difference', fontFamily: 'Monoton', fontSize: 28, userSelect: 'none' }}>AA</div> */}
						<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#222222', fontSize: 48, color: '#FFFFFF'}} id="div1">
							<Button variant="contained" style={{ width: 250, marginBottom: 16 }} onClick={() => { downloadFile("test", "test"); setGettingUATLogs(true) }} disabled={gettingUATLogs}>
								{gettingUATLogs ? <CircularProgress size={25} /> : <span>Download pidief <b> [10MB]</b></span>}
							</Button>
                            <Button variant="contained" style={{ width: 250, marginBottom: 16 }} onClick={() => { downloadFile("test2", "test2"); setGettingUATLogs(true) }} disabled={gettingUATLogs}>
								{gettingUATLogs ? <CircularProgress size={25} /> : <span>Download pidief <b> [41MB]</b></span>}
							</Button>

            </div>
						<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: 'linear-gradient(to bottom, #222222, #777777'}}>
                {/* Test Three */}
            </div>
            <ParallaxBanner
                    className="your-class"
                    layers={[
                    {
                        amount: 0.5,
                    },
                    ]}
                    style={{
                        height: '500px',
                        width: '100%'
                    }}>
                <h1>Banner Children</h1>
            </ParallaxBanner>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
            <ScrollIntoView selector="#div2">
                <IconButton style={{ marginRight: 20 }}>
                <Icon path={mdiArrowDownCircleOutline}
                    size={2}
                    color="#BDBDBD"
                    style={{ position: 'fixed', bottom: '10%', mixBlendMode: 'difference', opacity: 0.5 }}/>
                </IconButton>
            </ScrollIntoView>
							<ScrollIntoView selector="#div1">
								<IconButton>
									<Icon path={mdiArrowUpCircleOutline}
										size={2}
										color="#BDBDBD"
										style={{ position: 'fixed', bottom: '10%', mixBlendMode: 'difference', opacity: 0.5 }} />
								</IconButton>
							</ScrollIntoView>
            </div>
            </ParallaxProvider>
            
        )
}

export default Stream;