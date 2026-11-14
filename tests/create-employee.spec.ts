import { expect, test } from "../fixtures/custom-fixtures";
import { EmployeeData } from "../interfaces";
import employeeData from "../test-data/create-employee.json";
const typedEmployee: EmployeeData[] = employeeData;
test.describe("Create employee @regression", () => {
    for (const employeeDataSet of typedEmployee) {
        test(`creates and finds data set ${employeeDataSet.firstName} by ID`, async ({ pimPage }) => {
            // const typedEmployee: EmployeeData = employeeDataSet;

            await pimPage.navigateToPim();
            await pimPage.openAddEmployee();

            const employeeId = await pimPage.employeeId.inputValue();
            await pimPage.createEmployee(employeeDataSet);

            await expect(pimPage.firstName).toHaveValue(employeeDataSet.firstName);
            await expect(pimPage.middleName).toHaveValue(employeeDataSet.middleName);
            await expect(pimPage.lastName).toHaveValue(employeeDataSet.lastName);

            await pimPage.openEmployeeList();
            await pimPage.searchEmployeeById(employeeId);

            const employeeRow = pimPage.resultRow(employeeId);
            await expect(employeeRow).toHaveCount(1);
            await expect(employeeRow).toContainText(employeeDataSet.firstName);
            await expect(employeeRow).toContainText(`${employeeDataSet.firstName} ${employeeDataSet.middleName}`);
            await expect(employeeRow).toContainText(employeeDataSet.lastName);
        });
    }
});