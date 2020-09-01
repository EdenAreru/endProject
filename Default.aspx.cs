using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OleDb;

public partial class Default : System.Web.UI.Page, IPostBackEventHandler {

    public void RaisePostBackEvent(string eventArgument) {
    
    
    
    }
}


public partial class _Default : System.Web.UI.Page
{
  

    protected void Page_Load(object sender, EventArgs e)
    {

    }
    //INSERT
    protected void Button1_Click(object sender, EventArgs e)
    {
        OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("App_Data/players.accdb") + ";");
        OleDbCommand cmd = conn.CreateCommand();
        conn.Open();
        String Pname = "שם";
      

        cmd.CommandText = "insert into players (Pname, fullTime, Pgold, Psilver, Pbronze) Values ('" + Pname + "', '00:00:00','0','0','0')";
        cmd.ExecuteNonQuery();
        MessageBox.Text = "Record Submitted, Congrats";
        conn.Close();
    }
    //UPDATE
    protected void Button2_Click(object sender, EventArgs e)
    {
        OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + HttpContext.Current.Server.MapPath("App_Data/players.accdb") + ";");
        OleDbCommand cmd = conn.CreateCommand();
        OleDbDataAdapter da = new OleDbDataAdapter("select * from players ", conn); ;
        conn.Open();

        string query = "update players set Pname = 'חדש דנדש', fullTime='00:20:20' where Pname = 'שם'";
        var accessUpdateCommand = new OleDbCommand(query, conn);
        da.UpdateCommand = accessUpdateCommand;
        da.UpdateCommand.ExecuteNonQuery();
        MessageBox.Text = "Record changed, Congrats";
        conn.Close();
    }
}
