import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Image from 'next/image';

export default function SearchResult() {
    return (
        <React.Fragment>
            <div className='flex flex-col bg-[#f7e9e4] h-screen w-screen px-16 items-center'>
                <h1 className='text-center'>Resultados</h1>
                <div className='flex items-center justify-center w-[100%]'>
                    <div className='w-1/3'>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">Objetivos específicos - Ano 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography component="span">Objetivos específicos - Ano 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <Typography component="span">Accordion Actions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="relative h-screen w-1/3 items-center flex justify-center">
                        <Image src={"/flower-32541.svg"} alt={""} width={200} height={500} />

                    </div>
                    <div className='flex w-1/3 justify-center'>
                        outras coisas
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}