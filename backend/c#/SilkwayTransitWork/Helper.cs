namespace SilkwayTransitWork
{
    public class Helper
    {
        public static string ConnectionString()
        {
            try
            {
                var configBuilder = new ConfigurationBuilder();
                var path = Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "appsettings.json");
                configBuilder.AddJsonFile(path, false);
                var root = configBuilder.Build();
                var appSetting = root.GetSection("ConnectionStrings:DefaultConnection");
                return appSetting.Value;
            }
            catch
            {
                return "";
            }
        }
    }
}
