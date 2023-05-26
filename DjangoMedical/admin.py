from django.contrib import admin

# Register your models here.
from DjangoMedical.models import Company,Medicine,MedicineDetails,Employee,Customer,Bill,EmployeeSalary,EmployeeBank,BillDetails,CustomerRequest,CompanyAccount,CompanyBank 

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id','name','license_no','address','contact_no','email','description','added_on')
admin.site.register(Company,CompanyAdmin)


class MedicineAdmin(admin.ModelAdmin):
    list_display = ('id','name','medical_type','buy_price','sell_price','c_gst','s_gst','batch_no','shelf_no','expire_date','mfg_date','company_id','description','in_stock_total','qty_in_strip')
admin.site.register(Medicine,MedicineAdmin)

class MedicineDetailAdmin(admin.ModelAdmin):
    list_display = ('id','medicine_id','salt_name','salt_qty','description')
admin.site.register(MedicineDetails,MedicineDetailAdmin)

class CompanyAccountAdmin(admin.ModelAdmin):
    list_display = ('id','company_id','transaction_type','transaction_amount','transaction_date','payment_mode')
admin.site.register(CompanyAccount,CompanyAccountAdmin)

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id','name','joining_date','phone','address','added_on')
admin.site.register(Employee,EmployeeAdmin)

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id','name','phone','address','added_on')
admin.site.register(Customer,CustomerAdmin)


class BillDetailsAdmin(admin.ModelAdmin):
    list_display = ('id','bill_id','medicine_id','quantity','added_on')
admin.site.register(BillDetails,BillDetailsAdmin)

class BillAdmin(admin.ModelAdmin):
    list_display = ('id','customer_id','added_on')
admin.site.register(Bill,BillAdmin)

class EmployeeBankAdmin(admin.ModelAdmin):
    list_display = ('id','bank_account_no','ifsc_Code','employee_id')
admin.site.register(EmployeeBank,EmployeeBankAdmin)

class EmployeeSalaryAdmin(admin.ModelAdmin):
    list_display = ('id','employee_id','salary_amount')
admin.site.register(EmployeeSalary,EmployeeSalaryAdmin)

class CompanyBankAdmin(admin.ModelAdmin):
    list_display = ('id','accounts_holder_name','bank_account_no','ifsc_Code','company_id')
admin.site.register(CompanyBank,CompanyBankAdmin)

admin.site.register(CustomerRequest)

