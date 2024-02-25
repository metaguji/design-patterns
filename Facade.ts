/*
Facade Pattern
- Structural design pattern
- Provides a facade or simple interface that encapsulates multiple subsystems from the client
*/

interface Item {
  id: string;
}

interface StockItem extends Item {
  stock: number;
}

interface PriceItem extends Item {
  price: number;
}

interface CartItem extends Item {
  quantity: number;
}

const sampleInventoryList: StockItem[] = [
  { id: "1", stock: 20 },
  { id: "2", stock: 20 },
  { id: "3", stock: 20 },
];

const priceList: PriceItem[] = [
  { id: "1", price: 75.5 },
  { id: "2", price: 199.99 },
  { id: "3", price: 250 },
];

class InventoryChecker {
  private inventoryDB: StockItem[] = sampleInventoryList;

  public checkStock(cartItem: CartItem): boolean {
    const isItemValid = this.inventoryDB.some(
      ({ id, stock }) => id === cartItem.id && stock >= cartItem.quantity
    );
    return isItemValid;
  }
}

class PaymentService {
  public processPayment(amount: number) {
    console.log(`Payment of ${amount} has been successfully processed`);
  }
}

class ShoppingCartFacade {
  private inventoryChecker = new InventoryChecker();
  private paymentService = new PaymentService();

  private cart: CartItem[] = [];

  public addItem(item: CartItem): void {
    if (this.inventoryChecker.checkStock(item)) {
      this.cart.push(item);

      console.log(`Item added to cart: ${JSON.stringify(item)}`);
    } else {
      console.log("Unable to add item to cart");
    }
  }

  public removeItem(itemId: string): void {
    this.cart.filter(({ id }) => id !== itemId);

    console.log(`Item removed from cart: ${JSON.stringify({ id: itemId })}`);
  }

  public totalAmount(): number {
    const cartTotalAmount = this.cart
      .map(({ id: cartId, quantity: cartQuantity }) => {
        const itemPrice = priceList.find(({ id }) => id === cartId)?.price;
        return itemPrice ? itemPrice * cartQuantity : 0;
      })
      .reduce((acc, curr) => acc + curr, 0);

    return cartTotalAmount;
  }

  public checkout(): void {
    this.paymentService.processPayment(this.totalAmount());
  }
}

const cart = new ShoppingCartFacade();

cart.addItem({ id: "1", quantity: 2 });

cart.removeItem("1");

cart.addItem({ id: "1", quantity: 999 });

cart.addItem({ id: "2", quantity: 5 });

cart.addItem({ id: "3", quantity: 3 });

const cartTotalAmount = cart.totalAmount();
console.log(`Total cart amount: ${cartTotalAmount}`);

cart.checkout();
