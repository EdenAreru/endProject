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
        string myMin = context.Request["myMin"];
        string mySec = context.Request["mySec"];
        string myGold = context.Request["myGold"];
        string mySilver = context.Request["mySilver"];
        string myBronze = context.Request["myBronze"];
        string allSec = context.Request["allSec"];
        OleDbConnection conn = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("app_data/players.accdb") + ";");
        OleDbCommand cmd = conn.CreateCommand();
        OleDbDataAdapter da = new OleDbDataAdapter("select * from players", conn);
        conn.Open();


        string query = "UPDATE players SET fullTime = '00:" + myMin + ":" + mySec + "',TimeInSec = '"+allSec+"',  Pgold = '" + myGold + "', Psilver = '" + mySilver + "', Pbronze = '" + myBronze + "'  WHERE Pname = '" + myName + "'";


        var accessUpdateCommand = new OleDbCommand(query, conn);
        da.UpdateCommand = accessUpdateCommand;
        da.UpdateCommand.ExecuteNonQuery();



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
















