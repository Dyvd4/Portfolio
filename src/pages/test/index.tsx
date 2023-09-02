import Button from '@components/Button';
import FormControl from '@components/FormControl';
import Input from '@components/Input';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '@components/Modal';
import useModalDisclosure from '@components/Modal/hooks/useModalDisclosure';
import EditProjectModal from '@components/Modals/Project/EditProjectModal';
import Textarea from '@components/Textarea';
import { cn } from '@utils/component-utils';
import { ComponentPropsWithRef, PropsWithChildren, useState } from 'react';

type _IndexProps = {}

export type IndexProps = _IndexProps &
    Omit<PropsWithChildren<ComponentPropsWithRef<'div'>>, keyof _IndexProps>

function Index({ className, children, ...props }: IndexProps) {
    const { isActive, open, close } = useModalDisclosure()
    const { isActive: pIsActive, open: pOpen, close: pClose } = useModalDisclosure()
    const [projectId, setProjectId] = useState<number | undefined>();
    const handleProjectModalOpen = () => {
        pOpen()
        setProjectId(340071710);

    }
    return (
        <div
            className={cn(``, className)}
            {...props}>
            <Button onClick={open}>open modal</Button>
            <Button onClick={handleProjectModalOpen}>edit project</Button>
            <EditProjectModal projectId={projectId} isActive={pIsActive} close={pClose} />
            {/* <Modal isActive={isActive}>
                <ModalHeader close={close}>Contact Form</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-2">
                        <FormControl>
                            <Input className="w-full" placeholder="Name" />
                        </FormControl>
                        <FormControl>
                            <Input
                                className="w-full"
                                placeholder="Email"
                                type="email"
                            />
                        </FormControl>
                        <FormControl>
                            <Textarea
                                className="w-full resize-none"
                                placeholder="Type your message here..."
                                rows={4}
                            />
                        </FormControl>
                        <button type="submit" className="hidden"></button>
                    </form>
                </ModalBody>
                <ModalFooter className="flex flex-col gap-2">
                    <Button>
                        Send
                    </Button>
                </ModalFooter>
            </Modal> */}
        </div>
    );
}

export default Index;