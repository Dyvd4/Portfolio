import Button from '@components/Button';
import FormControl from '@components/FormControl';
import Input from '@components/Input';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '@components/Modal';
import useModalDisclosure from '@components/Modal/hooks/useModalDisclosure';
import Textarea from '@components/Textarea';
import { cn } from '@utils/component-utils';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';

type _IndexProps = {}

export type IndexProps = _IndexProps &
    Omit<PropsWithChildren<ComponentPropsWithRef<'div'>>, keyof _IndexProps>

function Index({ className, children, ...props }: IndexProps) {
    const { isActive, open, close } = useModalDisclosure()
    return (
        <div
            className={cn(``, className)}
            {...props}>
            <Button onClick={open}>open modal</Button>
            <Modal isLoading isActive={isActive}>
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
            </Modal>
        </div>
    );
}

export default Index;