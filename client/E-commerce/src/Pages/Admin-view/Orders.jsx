import AdminOrderDetails from "@/components/Admin-components/AdminOrderDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

const Orders = () => {

  const [openDetailsDialog, setOpenDetailsDialog ] = useState(false)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1234</TableCell>
              <TableCell>12/01/2025</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell>950</TableCell>
              <TableCell>
                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                      setOpenDetailsDialog(false);
                      // dispatch(resetOrderDetails());
                    }}
                  >
                    <Button
                        onClick={() =>
                          //  handleFetchOrderDetails(orderItem?._id)
                           setOpenDetailsDialog(true)
                        }
                    >
                      View Details
                    </Button>
                    <AdminOrderDetails 
                    // orderDetails={orderDetails} 
                    />
                  </Dialog>
                </TableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
