import Button from "@components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import { removeEntity } from "@utils/request-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

type _DeleteProjectModalProps = {
    projectId?: number
    isActive: boolean
    close(): void
};

export type DeleteProjectModalProps = _DeleteProjectModalProps &
    Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _DeleteProjectModalProps>;

function DeleteProjectModal({ className, children, projectId, ...props }: DeleteProjectModalProps) {

    const queryClient = useQueryClient();
    const deleteProjectMutation = useMutation(() => {
        props.close();
        return toast.promise(
            removeEntity({
                route: "/api/project",
                entityId: projectId!.toString()
            }),
            {
                loading: "Deleting project...",
                success: "Successfully deleted project",
                error: "An unknown error occurred",
            },
            {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            }
        );
    }, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(["projects"])
        }
    });

    return (
        <Modal isActive={props.isActive}>
            <ModalHeader close={props.close}>
                Are you sure?
            </ModalHeader>
            <ModalBody>
                This will delete the project
            </ModalBody>
            <ModalFooter className="flex gap-2">
                <Button onClick={props.close}>
                    Cancel
                </Button>
                <Button onClick={() => deleteProjectMutation.mutate()}>
                    Yes
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteProjectModal;
