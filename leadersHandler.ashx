
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

        string myTeam = context.Request["myTeam"]; // חשוב לשים לב שזה אותו שם משתנה כמו בקובץ הJS
        string endScore = context.Request["pScore"] ;
        string myName = context.Request["myName"];

        //לשים מידע בטבלה
        OleDbConnection conn = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("app_data/players.accdb") + ";");
        OleDbCommand cmd = conn.CreateCommand();
        OleDbDataAdapter da = new OleDbDataAdapter("select * from players", conn);


        conn.Open();
        string query = "UPDATE players SET endScore = '" + endScore + "' WHERE Pname = '" + myName + "'";
        var accessUpdateCommand = new OleDbCommand(query, conn);
        da.UpdateCommand = accessUpdateCommand;
        da.UpdateCommand.ExecuteNonQuery();
        conn.Close();



        ////לקיחת מידע מהטבלה
        string myQueryGameD = "select Pname, Pimage, fullTime, Pgold, Psilver, Pbronze, endScore  from " + myTeam + " order by endScore asc";
        DataSet GameDit = sqlRet(myQueryGameD);
        String mePrint = "{\"players\":" + JsonConvert.SerializeObject(GameDit.Tables[0]) + "}";

        context.Response.Write(mePrint);

    }

    public DataSet sqlRet(string myQuery)
    {
        string mySource = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("App_Data/players.accdb") + ";";

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
















