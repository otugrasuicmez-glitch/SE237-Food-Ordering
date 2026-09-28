class ErpManager {

    void updateStock() {
        System.out.println("Stock updated");
    }

    void calculateMaterialNeeds() {
        System.out.println("Material needs calculated");
    }

    void createInvoice() {
        System.out.println("Invoice created");
    }
}


class InventoryService11 {

    void updateStock() {
        System.out.println("Stock updated");
    }
}


class MaterialPlanner11 {

    void calculateMaterialNeeds() {
        System.out.println("Material requirements calculated");
    }
}


class InvoiceService11 {

    void createInvoice() {
        System.out.println("Invoice created");
    }
}


public class Main11 {
    public static void main(String[] args) {
        InventoryService11 inventory =
            new InventoryService11();

        MaterialPlanner11 planner =
            new MaterialPlanner11();

        InvoiceService11 invoice =
            new InvoiceService11();

        inventory.updateStock();
        planner.calculateMaterialNeeds();
        invoice.createInvoice();
    }
}