import { Locator, Page } from "@playwright/test";
import { EmployeeData } from "../interfaces";
import { BasePage } from "./BasePage";

export class PimPage extends BasePage {
    readonly pimLink: Locator;
    readonly addButton: Locator;
    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;
    readonly employeeId: Locator;
    readonly saveButton: Locator;
    readonly employeeListLink: Locator;
    readonly employeeIdSearch: Locator;
    readonly searchButton: Locator;
    readonly resultRows: Locator;

    constructor(page: Page) {
        super(page);
        this.pimLink = page.getByRole("link", { name: "PIM" });
        this.addButton = page.getByRole("button", { name: /Add/ });
        this.firstName = page.getByRole("textbox", { name: "First Name" });
        this.middleName = page.getByRole("textbox", { name: "Middle Name" });
        this.lastName = page.getByRole("textbox", { name: "Last Name" });
        this.employeeId = page.locator(".oxd-input-group").filter({ hasText: "Employee Id" }).getByRole("textbox");
        this.saveButton = page.getByRole("button", { name: "Save" });
        this.employeeListLink = page.getByRole("link", { name: "Employee List" });
        this.employeeIdSearch = page.locator(".oxd-input-group").filter({ hasText: "Employee Id" }).getByRole("textbox");
        this.searchButton = page.getByRole("button", { name: "Search" });
        this.resultRows = page.getByRole("row");
    }

    async navigateToPim(): Promise<void> {
        await this.openAuthenticatedDashboard();
        await this.pimLink.click();
    }

    async openAddEmployee(): Promise<void> {
        await this.addButton.click();
    }

    async createEmployee(employee: EmployeeData): Promise<void> {
        await this.firstName.fill(employee.firstName);
        await this.middleName.fill(employee.middleName);
        await this.lastName.fill(employee.lastName);
        await this.saveButton.click();
        await this.page.waitForURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
    }

    async openEmployeeList(): Promise<void> {
        await this.pimLink.click();
    }

    async searchEmployeeById(employeeId: string): Promise<void> {
        await this.employeeIdSearch.fill(employeeId);
        await this.searchButton.click();
    }

    resultRow(employeeId: string): Locator {
        return this.resultRows.filter({ hasText: employeeId });
    }
}