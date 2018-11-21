import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {SERVER_URL} from '../../Constants/ServerConstants';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/internal/operators';
import {Recipe} from '../../Model/Recipe';
import {Product} from '../../Model/Product';
import {Message} from '../../Model/Message';
import {Category} from '../../Model/Category';
import {InventoryTransaction} from '../../Model/InventoryTransaction';
import {ReportRequest} from '../../Model/ReportRequest';
import {AllActivitiesReport} from '../../Model/AllActivitiesReport';
import {VendorReport} from '../../Model/VendorReport';
import {Vendor} from '../../Model/Vendor';
import {SingleActivityReport} from '../../Model/SingleActivityReport';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventoryURL: string = `${SERVER_URL}/inventory`;

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  //// Categories


  getAllCategories(): Observable<Category[]>  {
    const url: string = `${this.inventoryURL}/category/all`;
    return <Observable<Category[]>> this.http.get(url)
      .pipe(
        tap(categories => console.log(`Fetched categories`)),
        // catchError(this.handleError('getAllCategories()', []))
      );
  }



  // getAllCategoriesByMasterCategory(masterCategory: string): Observable<Category[]>  {
  //   const url: string = `${this.inventoryURL}/category/master/${masterCategory}`;
  //   return <Observable<Category[]>> this.http.get(url)
  //     .pipe(
  //       tap(categories => console.log(`Fetched categories`)),
  //       catchError(this.handleError('getAllCategoriesByMasterCategory()', []))
  //     );
  // }

  getFoodCategories(): Observable<Category[]>  {
    const url: string = `${this.inventoryURL}/category/food`;
    return <Observable<Category[]>> this.http.get(url)
      .pipe(
        tap(categories => console.log(`Fetched food categories`)),
        // catchError(this.handleError('getFoodCategories()', []))
      );
  }

  getIngredientCategories(): Observable<Category[]>  {
    const url: string = `${this.inventoryURL}/category/ingredient`;
    return <Observable<Category[]>> this.http.get(url)
      .pipe(
        tap(categories => console.log(`Fetched ingredient categories`)),
        // catchError(this.handleError('getIngredientCategories()', []))
      );
  }

  getConsumableCategories(): Observable<Category[]>  {
    const url: string = `${this.inventoryURL}/category/consumable`;
    return <Observable<Category[]>> this.http.get(url)
      .pipe(
        tap(categories => console.log(`Fetched consumable categories`)),
        // catchError(this.handleError('getConsumableCategories()', []))
      );
  }

  getCategoryCount(): Observable<number>  {
    const url: string = `${this.inventoryURL}/category/count`;
    return <Observable<number>> this.http.get(url)
      .pipe(
        tap(count => console.log(`Fetched count`)),
        // catchError(this.handleError('getCategoryCount()', []))
      );
  }

  getAllNonFoodCategories(): Observable<Category[]> {
    const url: string = `${this.inventoryURL}/category/noFood`;
    return <Observable<Category[]>>this.http.get(url)
      .pipe(
        tap(categories => console.log(`Fetched non food categories`)),
        // catchError(this.handleError('getAllCategoryAbbreviations()', []))
      );
  }

  getAllCategoryAbbreviations(): Observable<string[]> {
    const url: string = `${this.inventoryURL}/category/abbreviations`;
    return <Observable<string[]>>this.http.get(url)
      .pipe(
        tap(categoryAbbreviations => console.log(`Fetched category abbreviations`)),
        // catchError(this.handleError('getAllCategoryAbbreviations()', []))
      );
  }

  addNewCategory(category: Category): Observable<Category>  {
    const url: string = `${this.inventoryURL}/category`;
    return <Observable<Category>> this.http.post(url, category, httpOptions)
      .pipe(
        tap(category => console.log(`Insert attempted`)),
        // catchError(this.handleError('addNewCategory()', []))
      );
  }

  updateCategory(category: Category): Observable<Category>  {
    const url: string = `${this.inventoryURL}/category`;
    return <Observable<Category>>this.http.put(url, category, httpOptions)
      .pipe(
        tap(category => console.log(`Update attempted`)),
        // catchError(this.handleError('updateCategory()', []))
      );
  }

  deleteCategory(categoryId: number): Observable<Message> {
    const url: string = `${this.inventoryURL}/category/${categoryId}`;
    return <Observable<Message>>this.http.delete(url, httpOptions)
      .pipe(
        tap(message => console.log(`Delete attempted`)),
        // catchError(this.handleError('deleteCategory()', []))
      );
  }

  /////  Inventory Activities and Records

  // getAllActivities(): Observable<InventoryActivity[]> {
  //   const url: string = `${this.inventoryURL}/activities`;
  //   return <Observable<InventoryActivity[]>> this.http.get(url)
  //     .pipe(
  //       tap(inventoryActivities => console.log(`Fetched inventory activities`)),
  //       catchError(this.handleError('getAllActivities()', []))
  //     );
  // }

  addInventoryRecord(inventoryRecord: InventoryTransaction): Observable<InventoryTransaction> {
    const url: string = `${this.inventoryURL}/record`;
    return <Observable<InventoryTransaction>> this.http.post(url, inventoryRecord, httpOptions)
      .pipe(
        tap(inventoryRecord => console.log(`Added inventory record`)),
        // catchError(this.handleError('addInventoryRecord()', []))
      );
  }

  openInventory(): Observable<InventoryTransaction[]> {
    const url: string = `${this.inventoryURL}/open`;
    return <Observable<InventoryTransaction[]>> this.http.get(url)
      .pipe(
        tap(inventoryClosed => console.log(`closeInventory()`, [])),
        // catchError(this.handleError('closeInventory()', []))
      );
  }

  closeInventory(): Observable<InventoryTransaction[]> {
    const url: string = `${this.inventoryURL}/close`;
    return <Observable<InventoryTransaction[]>> this.http.get(url)
      .pipe(
        tap(inventoryClosed => console.log(`closeInventory()`, [])),
        // catchError(this.handleError('closeInventory()', []))
      );
  }

  checkInventoryClosed(): Observable<boolean> {
    const url: string = `${this.inventoryURL}/close/check`;
    return <Observable<boolean>> this.http.get(url)
      .pipe(
        tap(inventoryCloseCheck => console.log(`checkInventoryClosed()`, [])),
        // catchError(this.handleError('error at checkInventoryClosed()', []))
      );
  }

  getAllVendors(): Observable<Vendor[]> {
    const url: string = `${this.inventoryURL}/vendors`;
    return <Observable<Vendor[]>> this.http.get(url)
      .pipe(
        tap(vendors => console.log(`getAllVendors()`, [])),
        // catchError(this.handleError('getAllVendors()', []))
      );
  }

  getAllPartners(): Observable<Vendor[]>  {
    const url: string = `${this.inventoryURL}/partners`;
    return <Observable<Vendor[]>> this.http.get(url)
      .pipe(
        tap(partners => console.log(`getAllPartners()`, [])),
        // catchError(this.handleError('getAllPartners()', []))
      );
  }

  getAllInventoryTransactions(inventoryReportRequest: ReportRequest): Observable<AllActivitiesReport>  {
    const url: string = `${this.inventoryURL}/report/activity/all`;
    return <Observable<AllActivitiesReport>> this.http.post(url, inventoryReportRequest, httpOptions)
      .pipe(
        tap(inventoryTransactions => console.log(`getAllTransactions()`, [])),
        // catchError(this.handleError('getAllTransactions()', []))
      );
  }

  getInventoryTransactionsByActivity(inventoryReportRequest: ReportRequest): Observable<SingleActivityReport>  {
    const url: string = `${this.inventoryURL}/report/activity/one/${inventoryReportRequest.activity}`;
    return <Observable<SingleActivityReport>> this.http.post(url, inventoryReportRequest, httpOptions)
      .pipe(
        tap(inventoryTransactions => console.log(`getInventoryTransactionsByActivity()`, [])),
        // catchError(this.handleError('getInventoryTransactionsByActivity()', []))
      );
  }

  printSingleActivityReportBill(singleActivityReport: SingleActivityReport): Observable<boolean>  {
    const url: string = `${this.inventoryURL}/report/activity/one/${singleActivityReport.activity}/print`;
    return <Observable<boolean>> this.http.post(url, singleActivityReport, httpOptions)
      .pipe(
        tap(printed => console.log(`printSingleActivityReportBill()`, [])),
        // catchError(this.handleError('printSingleActivityReportBill()', []))
      );
  }

  getInventoryTransactionsByVendor(inventoryReportRequest: ReportRequest): Observable<VendorReport>  {
    const url: string = `${this.inventoryURL}/report/vendor`;
    return <Observable<VendorReport>>  this.http.post(url, inventoryReportRequest, httpOptions)
      .pipe(
        tap(inventoryTransactions => console.log(`getInventoryTransactionsByVendor()`, [])),
        // catchError(this.handleError('getInventoryTransactionsByVendor()', []))
      );
  }

  printAllActivitiesReportBill(allActivitiesReport: AllActivitiesReport): Observable<boolean>  {
    const url: string = `${this.inventoryURL}/report/activity/all/print`;
    return <Observable<boolean>> this.http.post(url, allActivitiesReport, httpOptions)
      .pipe(
        tap(printed => console.log(`printAllActivitiesReportBill()`, [])),
        // catchError(this.handleError('printAllActivitiesReportBill()', []))
      );
  }

  printVendorReportBill(vendorReport: VendorReport): Observable<boolean>  {
    const url: string = `${this.inventoryURL}/report/vendor/print`;
    return <Observable<boolean>> this.http.post(url, vendorReport, httpOptions)
      .pipe(
        tap(printed => console.log(`printVendorReportBill()`, [])),
        // catchError(this.handleError('printVendorReportBill()', []))
      );
  }

  /////  Products


  getAllProducts(): Observable<Product[]> {
    const url = `${this.inventoryURL}/product/all`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched products`)),
        // catchError(this.handleError('getAllProducts()', []))
      );
  }

  getAllExtraProducts(): Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/extra`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched extra products`)),
        // catchError(this.handleError('getAllExtraProducts()', []))
      );
  }

  getProductsByCategory(category: string): Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/category/${category}`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched products by ${category}`)),
        // catchError(this.handleError('getProductsByCategory()', []))
      );
  }

  // getAllProductsByMasterCategory(masterCategory: string): Observable<Product[]>  {
  //   const url = `${this.inventoryURL}/product/masterCategory/${masterCategory}`;
  //   return <Observable<Product[]>>this.http.get(url)
  //     .pipe(
  //       tap(products => console.log(`Fetched product by ${masterCategory}`)),
  //       catchError(this.handleError('getProductsByCategoryAbbreviation()', []))
  //     );
  // }

  getFoodProducts():  Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/food`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched food products`)),
        // catchError(this.handleError('getFoodProducts()', []))
      );
  }

  getIngredientProducts():  Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/ingredient`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched ingredient products`)),
        // catchError(this.handleError('getIngredientProducts()', []))
      );
  }

  getConsumableProducts():  Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/consumable`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched consumable products`)),
        // catchError(this.handleError('getConsumableProducts()', []))
      );
  }

  getRecipeProducts(): Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/recipe`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched recipe products`)),
        // catchError(this.handleError('getRecipeProducts()', []))
      );
  }

  getMenuProducts(): Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/menu`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched menu products`)),
        // catchError(this.handleError('getMenuProducts()', []))
      );
  }

  getAllNonFoodProducts(): Observable<Product[]>  {
    const url = `${this.inventoryURL}/product/noFood`;
    return <Observable<Product[]>>this.http.get(url)
      .pipe(
        tap(products => console.log(`Fetched all non-food products`)),
        // catchError(this.handleError('getAllNonFoodProducts()', []))
      );
  }

  addNewProduct(product: Product): Observable<Product>  {
    const url = `${this.inventoryURL}/product`;
    return <Observable<Product>>this.http.post(url, product, httpOptions)
      .pipe(
        tap(product => console.log(`Inserted product`)),
        // catchError(this.handleError('addNewProduct()', []))
      );
  }

  updateProduct(product: Product): Observable<Product>  {
    const url = `${this.inventoryURL}/product`;
    return <Observable<Product>>this.http.put(url, product, httpOptions)
      .pipe(
        tap(product => console.log(`Updated product`)),
        // catchError(this.handleError('updateProduct()', []))
      );
  }

  deleteProduct(id: number): Observable<Message>  {
    const url = `${this.inventoryURL}/product/${id}`;
    return <Observable<Message>>this.http.delete(url)
      .pipe(
        tap(message => console.log(`Deleted product`)),
        // catchError(this.handleError('deleteProduct()', []))
      );
  }

  /////  Recipe

  getRecipeByProductId(id: number): Observable<Recipe[]> {
    const url = `${this.inventoryURL}/product/${id}/recipe`;
    return <Observable<Recipe[]>> this.http.get(url)
      .pipe(
        tap(recipe => console.log(`Fetched recipe`)),
        // catchError(this.handleError('getRecipeByProductId()', []))
      );
  }

  getRecipeByMasterCategory(id: number, masterCategory: string): Observable<Recipe[]>  {
    const url = `${this.inventoryURL}/product/${id}/recipe/masterCategory/${masterCategory}`;
    return <Observable<Recipe[]>> this.http.get(url)
      .pipe(
        tap(recipe => console.log(`Fetched recipe by master category`)),
        // catchError(this.handleError('getRecipeByMasterCategory()', []))
      );
  }

  getExtraRecipeByProductId(id: number): Observable<Recipe[]> {
    const url = `${this.inventoryURL}/product/${id}/recipe/extra`;
    return <Observable<Recipe[]>> this.http.get(url)
      .pipe(
        tap(recipe => console.log(`Fetched extra recipe`)),
        // catchError(this.handleError('getExtraRecipeByProductId()', []))
      );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${this.inventoryURL}/recipe/one`;
    return <Observable<Recipe>> this.http.post(url, recipe, httpOptions)
      .pipe(
        tap(recipes => console.log(`Inserted recipe`)),
        // catchError(this.handleError('addRecipe()', []))
      );
  }

  finalizeRecipe(productId: number): Observable<Product> {
    const url = `${this.inventoryURL}/product/${productId}/recipe/complete`;
    return <Observable<Product>> this.http.get(url)
      .pipe(
        tap(recipes => console.log(`Recipe finalized`)),
        // catchError(this.handleError('finalizeRecipe()', []))
      );
  }

  deleteRecipeById(id: number): Observable<Message> {
    const url = `${this.inventoryURL}/recipe/${id}`;
    return <Observable<Message>> this.http.delete(url)
      .pipe(
        tap(message => console.log(`Deleted Ingredient`)),
        // catchError(this.handleError('deleteRecipeById()', []))
      );
  }

}
