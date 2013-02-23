<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CheckDependencies.ascx.cs" Inherits="RazorEstateAgent.StarterSite.CheckDependencies" %>
<%@ Register Namespace="umbraco.uicontrols" Assembly="controls" TagPrefix="umb" %>

<style type="text/css">
    #packageCheck {}
    #packageCheck ul { padding-left:15px; }
    #packageCheck li { background-position:0 3px; background-repeat:no-repeat; list-style-type:none; line-height:20px; padding:0 0 0 20px; }
    #packageCheck .installed { background-image:url(/usercontrols/RazorEstateAgent/tick.png); }
    #packageCheck .notInstalled { background-image:url(/usercontrols/RazorEstateAgent/cross.png); }
    
</style>

<umb:Pane runat="server" ID="panelSuccess" Visible="false" Text="Razor Estate Agents Starter Site: Checking Dependencies">
    <div id="packageCheck" class="success">
        <h3>Success</h3>
        <p>You have the dependency package installed in order for Razor Estate Agents Starter Site to work.</p>
        <ul>
            <li class="installed"><a href="http://our.umbraco.org/projects/website-utilities/imagegen" target="_blank" title="Installed">Image Gen</a></li>            
        </ul>
    </div>
</umb:Pane>


<umb:Pane runat="server" ID="panelImageGenFail" Visible="false" Text="Razor Estate Agents Starter Site: Checking Dependencies">
    <div id="packageCheck" class="error">
        <h3>Dependency Package not installed</h3>
        <p>The dependency package ImageGen needs to be installed in order for Razor Estate Agents Starter Site to work.</p>
        <p>Download the package from the Our.Umbraco.org community website</p>
        <ul>
            <li class="notInstalled"><a href="http://our.umbraco.org/projects/website-utilities/imagegen" target="_blank" title="Not Installed">Image Gen</a></li>
        </ul>
    </div>
</umb:Pane>