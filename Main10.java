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


class InventoryService10 {

    void updateStock() {
        System.out.println("Stock updated");
    }
}


class MaterialPlanner10 {

    void calculateMaterialNeeds() {
        System.out.println("Material needs calculated");
    }
}


class InvoiceService10 {

    void createInvoice() {
        System.out.println("Invoice created");
    }
}


public class Main10 {
    public static void main(String[] args) {
        InventoryService10 inventory =
            new InventoryService10();

        MaterialPlanner10 planner =
            new MaterialPlanner10();

        InvoiceService10 invoice =
            new InvoiceService10();

        inventory.updateStock();
        planner.calculateMaterialNeeds();
        invoice.createInvoice();
    }
}