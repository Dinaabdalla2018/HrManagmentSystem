﻿using HrManagment.DAL.Models;
using HrManagment.DAL.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HrManagment.BLL.Services.EmployeeServices
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IGenericRepository<Employee> _EmployeeRepository;
        public EmployeeService(IGenericRepository<Employee> EmployeeRepository)
        {
            _EmployeeRepository = EmployeeRepository;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _EmployeeRepository.GetAllAsync();
        }
       
        public async Task<Employee> GetByIdAsync(int EmployeeId)
        {
           return await _EmployeeRepository.GetByIdAsync(EmployeeId);
        }
    }
}
