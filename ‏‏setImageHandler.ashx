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
        string myPic = context.Request["myPic"];

        //Console.WriteLine("קיבל נתונים");

        OleDbConnection conn = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("app_data/players.accdb") + ";");
        OleDbCommand cmd = conn.CreateCommand();
        OleDbDataAdapter da = new OleDbDataAdapter("select * from players", conn); ;
        conn.Open();
        //Pname, fullTime, Pgold, Psilver, Pbronze
        string query = "update players set Pimage = '" + myPic + "' where Pname = '" + myName + "'";
        var accessUpdateCommand = new OleDbCommand(query, conn);
        Console.WriteLine("שאלה נשאלה");
        da.UpdateCommand = accessUpdateCommand;
        da.UpdateCommand.ExecuteNonQuery();

        //MessageBox.Text = "Record changed, Congrats";
        conn.Close();

        context.Response.Write("updatedPic");


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
















