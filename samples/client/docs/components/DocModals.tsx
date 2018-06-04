import * as React from "@barlus/nerv"

import {DocExample,  DocPage, DocSection, DocText, DocTitle} from "../../comps/DocPage";
import {Button, Column, Columns, Modal, ModalBody, ModalFooter, ModalHeader} from "@barlus/spectre";

export class DocModals extends DocPage<any,any> {
    static title = "Modals";
    static ready = true;


    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text='Modals are flexible dialog prompts.'/>
            <Columns>
                <Column>
                    <Button primary onClick={()=>this.setState({open:true})}>Open Modal</Button>
                    <Modal open={this.state.open || false} onBackgroundClick={()=>this.setState({open:false})} >
                        <ModalHeader>
                            Modal header
                        </ModalHeader>
                        <ModalBody>
                            <p>This is the content inside the modal.</p>
                            <h4>Lorem ipsum</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus
                                leo,
                                dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales
                                risus.
                                Etiam euismod ornare consequat.</p>
                            <p>Climb leg rub face on everything give attitude nap all day for under the
                                bed.
                                Chase mice attack feet but rub face on everything hopped up on
                                goofballs.</p>
                            <h4>Cupcake ipsum</h4>
                            <p>Jelly-o sesame snaps halvah croissant oat cake cookie. Cheesecake bear
                                claw
                                topping. Chupa chups apple pie carrot cake chocolate cake caramels.</p>
                            <p>De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor
                                fornix
                                dictum mauris. Hi brains mindless mortuis limbic cortex soulless
                                creaturas optic
                                nerve.</p>
                            <h4>Candy ipsum</h4>
                            <p>Efficiently unleash cross-media information without cross-media value.
                                Quickly
                                maximize timely deliverables for real-time schemas. Dramatically
                                maintain
                                clicks-and-mortar.</p>
                            <p>Caerphilly swiss fromage frais. Brie cheese and wine fromage frais chalk
                                and
                                cheese danish fontina smelly cheese who moved my cheese cow.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button primary>Share</Button>
                            <Button link onClick={()=>this.setState({open:false})}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </Column>
            </Columns>
            <DocText text={`
                Add a container component ~Modal~. You can add child elements with
                the ~ModalHeader~, ~ModalBody~ and ~ModalFooter~ - any or all of them.


                Spectre.css does not include JavaScript code, you will need to implement your JS to interact
                with modals. To make a modal appear, add the ~active~ attribute to the ~Modal~ container.
            `}/>
            <DocExample content={`
                <Modal>
                    <ModalHeader>
                        Modal header
                    </ModalHeader>
                    <ModalBody>
                        <p>This is the content inside the modal.</p>

                    </ModalBody>
                    <ModalFooter>
                        <Button primary>Share</Button>
                        <Button link>Close</Button>
                    </ModalFooter>
                </Modal>
            `}/>
            <DocTitle>Modal sizes</DocTitle>

            <DocText text={`
                Use the ~small~ attribute for a smaller modal dialog. The container max width
                is ~320px~
            `}/>
            <DocText text={`
            Use the ~large~ attribute for a full size modal. The container max width is
                ~960px~
            `}/>
        </DocSection>
    }
}