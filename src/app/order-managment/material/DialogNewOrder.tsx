import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  
  const DialogNewOrder = () => {

    

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add a new Material</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Material details</DialogTitle>
            <DialogDescription>
              Add the details of the orders
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rawmatShort" className="text-right">
                Short Name
              </Label>
              <Input id="rawmatShort" type="text" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rawmatName" className="text-right">
                Name
              </Label>
              <Input id="rawmatName" type="text" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rawmatColor" className="text-right">
                Color
              </Label>
              <Input id="rawmatColor" type="number" min={0} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rawmatType" className="text-right">
                Type
              </Label>
              <Input id="rawmatType" type="text" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rawmatMFinal" className="text-right">
                MFI Total
              </Label>
              <Input id="rawmatMFinal" type="number" min={0} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rawmatDensity" className="text-right">
                Density g/ccm
            </Label>
            <Input 
                id="rawmatDensity" 
                type="number" 
                min={0} 
                max={1} 
                step={0.001} 
                className="col-span-3" 
            />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rawmatBulkdens" className="text-right">
                Density Bulk
              </Label>
              <Input id="rawmatBulkdens" type="number" min={0} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save New Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DialogNewOrder;
  