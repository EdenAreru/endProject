<%@ WebHandler Language="C#" Class="Handler" %>

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

        string myName = context.Request["myName"];
        OleDbConnection conn = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("app_data/players.accdb") + ";");
        OleDbCommand cmd = conn.CreateCommand();

        conn.Open();
       
        cmd.CommandText = "insert into players (Pname, Pimage, fullTime, Pgold, Psilver, Pbronze) Values ('" + myName + "','', '00:00:00','0','0','0')";
        cmd.ExecuteNonQuery();


        conn.Close();

        context.Response.Write("updatedDataBase");


    }

    //public DataSet sqlRet(string myQuery)
    // {
    //   string mySource = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("App_Data/players.accdb") + ";";
    //
    //  OleDbDataAdapter oda = new OleDbDataAdapter(myQuery, mySource);
    //    DataSet ds = new DataSet();
    //    oda.Fill(ds);
    //   return ds;
    //  }
    //
    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
}
















