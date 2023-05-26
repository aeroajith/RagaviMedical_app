from django.shortcuts import render 
from rest_framework.generics import get_object_or_404
from datetime import datetime
from datetime import timedelta

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from DjangoMedical.models import Company,CompanyBank,Medicine,MedicineDetails,CompanyAccount,Employee,EmployeeBank,EmployeeSalary,CustomerRequest,Bill,BillDetails
from DjangoMedical.serializers import CompanySerializer,CompanyBankSerializer,MedicineSerializer,MedicineDetailSerializer,MedicineDetailSerializerSimple,CompanyAccountSerializer,EmployeeSerializer,EmployeeBankSerializer,EmployeeSalarySerializer,CustomerSerializer,BillSerializer,BillDetailsSerializer,CustomerRequestSerializer

# Create your views here. 

def index(request):
    return render(request, 'index.html')


class CompanyViewSet(viewsets.ViewSet):
     
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]
     
     def list(self,request):
          company = Company.objects.all()
          serializer = CompanySerializer(company,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Company List Data","data":serializer.data}
          return Response(response_dict)
     


     def create(self,request):
          try:
            serializer = CompanySerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Company Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Company Data"}
          return Response(dict_response)
     
     def retrieve(self,request,pk=None):
           
            queryset = Company.objects.all()
            company = get_object_or_404(queryset,pk=pk)
            serializer = CompanySerializer(company,context={"request":request})
            
            serializer_data=serializer.data
            company_bank_details = CompanyBank.objects.filter(company_id = serializer_data["id"])
            companybank_details_serializer = CompanyBankSerializer(company_bank_details,many=True)
            serializer_data["company_bank"] = companybank_details_serializer.data
           
            
            return Response({"error":False,"message":"Single Data Fetch","data":serializer_data})

     def update(self,request,pk=None):
          try:
            queryset = Company.objects.all()
            company = get_object_or_404(queryset,pk=pk)
            serializer = CompanySerializer(company,data=request.data,context={"request":request})
            serializer.is_valid()
            serializer.save()
            dict_response = {"error":False,"message":"Company Data Updated Successfully"}

          except:
              dict_response = {"error":True,"message":"Error During Updating Company Data"}
          return Response(dict_response)
     


class CompanyBankViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = CompanyBankSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Company Bank Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Company Bank Data"}
          return Response(dict_response)
     
     def list(self,request):
          companybank = CompanyBank.objects.all()
          serializer = CompanyBankSerializer(companybank,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Company Bank List Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = CompanyBank.objects.all()
            companybank = get_object_or_404(queryset,pk=pk)
            serializer = CompanyBankSerializer(companybank,context={"request":request})
            return Response({"error":False,"message":"Single Data Fetch","data":serializer.data})
           
     
     def update(self,request,pk=None):
          
            queryset = CompanyBank.objects.all()
            companybank = get_object_or_404(queryset,pk=pk)
            serializer = CompanyBankSerializer(companybank,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response ({"error":False,"message":"Company Bank Data Updated Successfully"})

          
class CompanyNameViewset(generics.ListAPIView):
    serializer_class = CompanySerializer
    def get_queryset(self):
        name = self.kwargs["name"]
        return Company.objects.filter(name=name)
    
class CompanyOnlyViewset(generics.ListAPIView):
    serializer_class = CompanySerializer
    def get_queryset(self):
        
        return Company.objects.all()
    
# Company account viewset
class CompanyAccountViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = CompanyAccountSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Company Account Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Company Account Data"}
          return Response(dict_response)
     
     def list(self,request):
          companyaccount = CompanyAccount.objects.all()
          serializer = CompanyAccountSerializer(companyaccount,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Company Account List Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = CompanyAccount.objects.all()
            companyaccount = get_object_or_404(queryset,pk=pk)
            serializer = CompanyAccountSerializer(companyaccount,context={"request":request})
            return Response({"error":False,"message":"Single Data Fetch","data":serializer.data})
           
     
     def update(self,request,pk=None):
          
            queryset = CompanyAccount.objects.all()
            companyaccount = get_object_or_404(queryset,pk=pk)
            serializer = CompanyAccountSerializer(companyaccount,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response ({"error":False,"message":"Company Account Data Updated Successfully"})

    


## Medicine Viewset
class MedicineViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = MedicineSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            ## Access the serializer and save in the Database Table

            medicine_id = serializer.data["id"]

            ##Adding Medicine details to database

            medicine_details_list = []
            for medicine_detail in request.data["medicine_details"]:
                medicine_detail["medicine_id"] = medicine_id
                medicine_details_list.append(medicine_detail)
                print(medicine_detail)


            serializer2 = MedicineDetailSerializer(data=medicine_details_list,many=True,context={"request":request})
            serializer2.is_valid()
            serializer2.save()

            dict_response = {"error":False,"message":"Medicine Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Medicine Data"}
          return Response(dict_response)
     
     def list(self,request):
          medicine = Medicine.objects.all()
          serializer = MedicineSerializer(medicine,many=True,context={"request":request})
          
          ##Adding extra key for medicine details in medicine
          medicine_data = serializer.data
          newmedicinelist=[]

          for medicine in medicine_data:
              medicine_details = MedicineDetails.objects.filter(medicine_id = medicine["id"])
              medicine_details_serializer = MedicineDetailSerializerSimple(medicine_details,many=True)
              medicine["medicine_details"] = medicine_details_serializer.data
              newmedicinelist.append(medicine)
          
          response_dict = {"error":False, "message":"All Medicine List Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = Medicine.objects.all()
            medicine = get_object_or_404(queryset,pk=pk)
            serializer = MedicineSerializer(medicine,context={"request":request})
            
            serializer_data=serializer.data
            medicine_details = MedicineDetails.objects.filter(medicine_id = serializer_data["id"])
            medicine_details_serializer = MedicineDetailSerializerSimple(medicine_details,many=True)
            serializer_data["medicine_details"] = medicine_details_serializer.data
           
            
            return Response({"error":False,"message":"Single Data Fetch","data":serializer_data})
           
     
     def update(self,request,pk=None):
          
            queryset = Medicine.objects.all()
            medicine = get_object_or_404(queryset,pk=pk)
            serializer = MedicineSerializer(medicine,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            for salt_detail in request.data["medicine_details"]:
                # Add salt details
                if salt_detail["id"] == 0:
                   del salt_detail["id"]
                   salt_detail["medicine_id"] = serializer.data["id"]
                   serializer2 = MedicineDetailSerializer(data=salt_detail,context={"request":request})
                   serializer2.is_valid()
                   serializer2.save()   
                else:
                    # For update salt details
                    queryset2 = MedicineDetails.objects.all()
                    medicine_salt = get_object_or_404(queryset2, pk=salt_detail["id"])
                    serializer3 = MedicineDetailSerializer(medicine_salt,data=salt_detail,context={"request":request})
                    serializer3.is_valid()
                    serializer3.save()

            return Response ({"error":False,"message":"Medicine Data Updated Successfully"})
           
          
class MedicineNameViewset(generics.ListAPIView):
    serializer_class = MedicineSerializer
    def get_queryset(self):
        name = self.kwargs["name"]
        return Medicine.objects.filter(name__contains=name)
    
# Company account viewset
class CompanyAccountViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = CompanyAccountSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Company Account Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Company Account Data"}
          return Response(dict_response)
     
     def list(self,request):
          companyaccount = CompanyAccount.objects.all()
          serializer = CompanyAccountSerializer(companyaccount,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Company Account List Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = CompanyAccount.objects.all()
            companyaccount = get_object_or_404(queryset,pk=pk)
            serializer = CompanyAccountSerializer(companyaccount,context={"request":request})
            return Response({"error":False,"message":"Single Data Fetch","data":serializer.data})
           
     
     def update(self,request,pk=None):
          
            queryset = CompanyAccount.objects.all()
            companyaccount = get_object_or_404(queryset,pk=pk)
            serializer = CompanyAccountSerializer(companyaccount,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response ({"error":False,"message":"Company Account Data Updated Successfully"})

    


## Medicine Viewset
class MedicineViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = MedicineSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            ## Access the serializer and save in the Database Table

            medicine_id = serializer.data["id"]

            ##Adding Medicine details to database

            medicine_details_list = []
            for medicine_detail in request.data["medicine_details"]:
                medicine_detail["medicine_id"] = medicine_id
                medicine_details_list.append(medicine_detail)
                print(medicine_detail)


            serializer2 = MedicineDetailSerializer(data=medicine_details_list,many=True,context={"request":request})
            serializer2.is_valid()
            serializer2.save()

            dict_response = {"error":False,"message":"Medicine Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Medicine Data"}
          return Response(dict_response)
     
     def list(self,request):
          medicine = Medicine.objects.all()
          serializer = MedicineSerializer(medicine,many=True,context={"request":request})
          
          ##Adding extra key for medicine details in medicine
          medicine_data = serializer.data
          newmedicinelist=[]

          for medicine in medicine_data:
              medicine_details = MedicineDetails.objects.filter(medicine_id = medicine["id"])
              medicine_details_serializer = MedicineDetailSerializerSimple(medicine_details,many=True)
              medicine["medicine_details"] = medicine_details_serializer.data
              newmedicinelist.append(medicine)
          
          response_dict = {"error":False, "message":"All Medicine List Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = Medicine.objects.all()
            medicine = get_object_or_404(queryset,pk=pk)
            serializer = MedicineSerializer(medicine,context={"request":request})
            
            serializer_data=serializer.data
            medicine_details = MedicineDetails.objects.filter(medicine_id = serializer_data["id"])
            medicine_details_serializer = MedicineDetailSerializerSimple(medicine_details,many=True)
            serializer_data["medicine_details"] = medicine_details_serializer.data
           
            
            return Response({"error":False,"message":"Single Data Fetch","data":serializer_data})
           
     
     def update(self,request,pk=None):
          
            queryset = Medicine.objects.all()
            medicine = get_object_or_404(queryset,pk=pk)
            serializer = MedicineSerializer(medicine,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            for salt_detail in request.data["medicine_details"]:
                # Add salt details
                if salt_detail["id"] == 0:
                   del salt_detail["id"]
                   salt_detail["medicine_id"] = serializer.data["id"]
                   serializer2 = MedicineDetailSerializer(data=salt_detail,context={"request":request})
                   serializer2.is_valid()
                   serializer2.save()   
                else:
                    # For update salt details
                    queryset2 = MedicineDetails.objects.all()
                    medicine_salt = get_object_or_404(queryset2, pk=salt_detail["id"])
                    serializer3 = MedicineDetailSerializer(medicine_salt,data=salt_detail,context={"request":request})
                    serializer3.is_valid()
                    serializer3.save()

            return Response ({"error":False,"message":"Medicine Data Updated Successfully"})
           
          

    

# Employee viewset
class EmployeeViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = EmployeeSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Employee Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Employee Data"}
          return Response(dict_response)
     
     def list(self,request):
          employee = Employee.objects.all()
          serializer = EmployeeSerializer(employee,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Employees List Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = Employee.objects.all()
            employee = get_object_or_404(queryset,pk=pk)
            serializer = EmployeeSerializer(employee,context={"request":request})
            return Response({"error":False,"message":"Single Data Fetch","data":serializer.data})
           
     
     def update(self,request,pk=None):
          
            queryset = Employee.objects.all()
            employee = get_object_or_404(queryset,pk=pk)
            serializer = EmployeeSerializer(employee,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response ({"error":False,"message":"Employee Data Updated Successfully"})

    

# Employee Bank viewset
class EmployeeBankViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = EmployeeBankSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Employee Bank Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Employee Bank Data"}
          return Response(dict_response)
     
     def list(self,request):
          employeeBank = EmployeeBank.objects.all()
          serializer = EmployeeSerializer(employeeBank,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Employees Bank Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = EmployeeBank.objects.all()
            employeeBank = get_object_or_404(queryset,pk=pk)
            serializer = EmployeeBankSerializer(employeeBank,context={"request":request})
            return Response({"error":False,"message":"Single Data Fetch","data":serializer.data})
           
     
     def update(self,request,pk=None):
          
            queryset = EmployeeBank.objects.all()
            employeeBank = get_object_or_404(queryset,pk=pk)
            serializer = EmployeeSerializer(employeeBank,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response ({"error":False,"message":"Employee Bank Data Updated Successfully"})
     

# Employee Salary viewset
class EmployeeSalaryViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            serializer = EmployeeSalarySerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Employee Salary Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Employee Salary Data"}
          return Response(dict_response)
     
     def list(self,request):
          employeeSalary = EmployeeSalary.objects.all()
          serializer = EmployeeSalarySerializer(employeeSalary,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Employees Salary List Data","data":serializer.data}
          return Response(response_dict)
     
     def retrieve(self,request,pk=None):
           
            queryset = EmployeeSalary.objects.all()
            employeeSalary = get_object_or_404(queryset,pk=pk)
            serializer = EmployeeSalarySerializer(employeeSalary,context={"request":request})
            return Response({"error":False,"message":"Single Data Fetch","data":serializer.data})
           
     
     def update(self,request,pk=None):
          
            queryset = EmployeeSalary.objects.all()
            employeeSalary = get_object_or_404(queryset,pk=pk)
            serializer = EmployeeSerializer(employeeSalary,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response ({"error":False,"message":"Employee Salary Data Updated Successfully"})

class EmployeeBankByEIDViewset(generics.ListAPIView):
    serializer_class = EmployeeBankSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        employee_id = self.kwargs["employee_id"]
        return EmployeeBank.objects.filter(employee_id=employee_id)   
     
    
class EmployeeSalaryByEIDViewset(generics.ListAPIView):
    serializer_class = EmployeeSalarySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        employee_id = self.kwargs["employee_id"]
        return EmployeeSalary.objects.filter(employee_id=employee_id)    


## Medicine Viewset
class GenerateBillViewset(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def create(self,request):
          try:
            # Save customer Data
            serializer = CustomerSerializer(data=request.data,context={"request":request})
            serializer.is_valid()
            serializer.save()

           

            customer_id = serializer.data["id"]

            #save Bill Data
          
            billdata={}
            billdata["customer_id"] = customer_id
            serializer2 = BillSerializer(data=billdata,context={"request":request})
            serializer2.is_valid()
            serializer2.save()
            bill_id = serializer2.data["id"]

           
            medicine_details_list = []
            for medicine_detail in request.data["medicine_details"]:
                medicine_detail1={}
                medicine_detail1["medicine_id"] = medicine_detail["id"]
                medicine_detail1["bill_id"] = bill_id
                medicine_detail1["quantity"] = medicine_detail["quantity"]
                
                medicine_deduct = Medicine.objects.get(id=medicine_detail["id"])
                medicine_deduct.in_stock_total = int(medicine_deduct.in_stock_total) - int(medicine_detail["quantity"])
                medicine_deduct.save()

                medicine_details_list.append(medicine_detail1)
               


            serializer3 = BillDetailsSerializer(data=medicine_details_list,many=True,context={"request":request})
            serializer3.is_valid()
            serializer3.save()

            dict_response = {"error":False,"message":"Bill Generate Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Generating Bill"}
          return Response(dict_response)



class CustomerRequestViewSet(viewsets.ViewSet):
     
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]
     
     def list(self,request):
          customer_request = CustomerRequest.objects.all()
          serializer = CustomerRequestSerializer(customer_request,many=True,context={"request":request})
          response_dict = {"error":False, "message":"All Customer Request Data","data":serializer.data}
          return Response(response_dict)
     


     def create(self,request):
          try:
            serializer = CustomerRequestSerializer(data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error":False,"message":"Customer Request Data Saved Successfully"}
          except:
            dict_response = {"error":True,"message":"Error During Saving Customer Request Data"}
          return Response(dict_response)
     
     def retrieve(self,request,pk=None):
           
            queryset = CustomerRequest.objects.all()
            customer_request = get_object_or_404(queryset,pk=pk)
            serializer = CustomerRequestSerializer(customer_request,context={"request":request})
            
            serializer_data=serializer.data
            return Response({"error":False,"message":"Single Data Fetch","data":serializer_data})

     def update(self,request,pk=None):
          try:
            queryset = CustomerRequest.objects.all()
            customer_request = get_object_or_404(queryset,pk=pk)
            serializer = CustomerRequestSerializer(customer_request,data=request.data,context={"request":request})
            serializer.is_valid()
            serializer.save()
            dict_response = {"error":False,"message":"Customer Request Data Updated Successfully"}

          except:
              dict_response = {"error":True,"message":"Error During Updating Customer Request Data"}
          return Response(dict_response)
     
     
class HomeApiViewSet(viewsets.ViewSet):
     authentication_classes = [JWTAuthentication]
     permission_classes = [IsAuthenticated]

     def list(slef,request):
        
        customer_request = CustomerRequest.objects.all()
        customer_request_serializer = CustomerRequestSerializer(customer_request, many=True, context={"request":request})


        bill_count = Bill.objects.all()
        bill_count_serializer = BillSerializer(bill_count, many=True, context={"request":request})


        medicine_count = Medicine.objects.all()
        medicine_count_serializer = MedicineSerializer(medicine_count, many=True, context={"request":request})

        company_count = Company.objects.all()
        company_count_serializer = CompanySerializer(company_count, many=True, context={"request":request})

        employee_count = Employee.objects.all()
        employee_count_serializer = EmployeeSerializer(employee_count, many=True, context={"request":request})

        bill_details = BillDetails.objects.all()
        
        sell_amount = 0
        buy_amount = 0
        for bill in bill_details:
            buy_amount= float(buy_amount + float(bill.medicine_id.buy_price))*int(bill.quantity)
            sell_amount= float((sell_amount + (float(bill.medicine_id.sell_price))+((float(bill.medicine_id.sell_price))*((float(bill.medicine_id.c_gst)+float(bill.medicine_id.s_gst))/100))))*int(bill.quantity)
        profit_amount = sell_amount - buy_amount
        print(sell_amount)

        customer_request_pending = CustomerRequest.objects.filter(status = False)
        customer_request_pending_serializer = CustomerRequestSerializer(customer_request_pending, many=True, context={"request":request})

        customer_request_completed = CustomerRequest.objects.filter(status = True)
        customer_request_completed_serializer = CustomerRequestSerializer(customer_request_completed, many=True, context={"request":request})
     
        current_date = datetime.today().strftime("%Y-%m-%d")
        current_date1 = datetime.today()
        current_date_7days = current_date1+timedelta(days=7)
        current_date_7days = current_date_7days.strftime("%Y-%m-%d")

        bill_details_today = BillDetails.objects.filter(added_on__date=current_date)
        
        sell_amount_today = 0
        buy_amount_today = 0
        
        for bill in bill_details_today:
            
            buy_amount_today= float(buy_amount_today + float(bill.medicine_id.buy_price))*int(bill.quantity)
            sell_amount_today= float((sell_amount_today + (float(bill.medicine_id.sell_price))+((float(bill.medicine_id.sell_price))*((float(bill.medicine_id.c_gst)+float(bill.medicine_id.s_gst))/100))))*int(bill.quantity)
        profit_amount_today = sell_amount_today - buy_amount_today
        print(sell_amount_today)

        medicine_expire = Medicine.objects.filter(expire_date__range=[current_date,current_date_7days])                 
        medicine_expire_serializer = MedicineSerializer(medicine_expire,many=True, context={"request":request})
        
        
        bill_dates = BillDetails.objects.order_by().values("added_on__date").distinct()

        profit_chart_list = []
        sell_chart_list = []
        buy_chart_list =[]
        for billdate in bill_dates:
            acces_date = billdate["added_on__date"]

            bill_data = BillDetails.objects.filter(added_on__date = acces_date)

            profit_amt_inner = 0
            sell_amt_inner = 0
            buy_amt_inner = 0

            for billsingle in bill_data:
                
                buy_amt_inner= float(buy_amt_inner + float(billsingle.medicine_id.buy_price))*int(billsingle.quantity)
                sell_amt_inner= float((sell_amt_inner + (float(billsingle.medicine_id.sell_price))+((float(billsingle.medicine_id.sell_price))*(float(billsingle.medicine_id.c_gst)+(float(billsingle.medicine_id.s_gst)))/100)))*int(billsingle.quantity)
            profit_amt_inner = sell_amt_inner - buy_amt_inner

            profit_chart_list.append({"date":acces_date,"amt":profit_amt_inner})
            sell_chart_list.append({"date":acces_date,"amt":sell_amt_inner})
            buy_chart_list.append({"date":acces_date,"amt":buy_amt_inner})
                
        
        dict_response = {"error":False,"message":"Home Page Data","customer_request":len(customer_request_serializer.data),
                         "bill_count":len(bill_count_serializer.data),
                         "medicine_count":len(medicine_count_serializer.data),
                         "company_count":len(company_count_serializer.data),
                         "employee_count":len(employee_count_serializer.data),
                         "sell_price":sell_amount,"buy_price":buy_amount,"total_profit":profit_amount,
                         "pending_request":len(customer_request_pending_serializer.data),
                         "completed_request":len(customer_request_completed_serializer.data),
                         "profit_amount_today":profit_amount_today,"sell_amount_today":sell_amount_today,
                         "medicine_expire":len(medicine_expire_serializer.data),
                         "sell_chart":sell_chart_list,"buy_chart":buy_chart_list,
                         "profit_chart":profit_chart_list,
                         
       
                         }
        return Response(dict_response)








## Company
company_list = CompanyViewSet.as_view({"get":"list"})
company_create = CompanyViewSet.as_view({"post":"create"})
company_update = CompanyViewSet.as_view({"put":"update"})


