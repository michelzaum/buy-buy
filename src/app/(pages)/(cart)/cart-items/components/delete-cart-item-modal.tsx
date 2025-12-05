import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteCartItemProps } from "../types";

export function DeleteCartItemModal({ isDeleteCartItemModalOpen, onCancel, onDelete }: DeleteCartItemProps) {
  return (
    <Dialog open={isDeleteCartItemModalOpen}>
      <DialogContent className="[&>button]:hidden flex flex-col gap-6">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>
            Quer mesmo excluir este item do carrinho? Você pode adicioná-lo novamente selecionando-o na lista de produtos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row w-full mt-4">
          <Button
            className="flex-1 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out"
            variant='secondary'
            onClick={onCancel}
          >
            <span className="font-semibold">Cancelar</span>
          </Button>
          <Button
            className="flex-1 hover:cursor-pointer hover:bg-red-500 transition-colors duration-200 ease-in-out"
            variant='destructive'
            onClick={onDelete}
          >
            <span className="font-semibold">Excluir</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
