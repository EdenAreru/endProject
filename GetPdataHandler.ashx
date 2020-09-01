﻿<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Newtonsoft.Json;
using System.Data;
using System.Data.OleDb;
using System.Collections.Generic;


public class Handler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        string myName = context.Request["myName"]; // חשוב לשים לב שזה אותו שם משתנה כמו בקובץ הJS
      

        string myQueryGameD = "select TimeInSec, Pgold, Psilver, Pbronze from players where Pname='"+myName+"'";
        DataSet GameDit = sqlRet(myQueryGameD);
         
        String mePrint =   "{\"playerData\":"+ JsonConvert.SerializeObject(GameDit.Tables[0]) + "}";
          
        context.Response.Write(mePrint);

    }

    public DataSet sqlRet(string myQuery)
    {
        string mySource = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("app_data/players.accdb") + ";";

        OleDbDataAdapter oda = new OleDbDataAdapter(myQuery, mySource);
        DataSet ds = new DataSet();
        oda.Fill(ds);
        return ds;
    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
}
















