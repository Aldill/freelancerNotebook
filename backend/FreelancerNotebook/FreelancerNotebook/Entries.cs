namespace FreelancerNotebook
{
    public class Entries
    {
        public int id { get; set; }
        public int projectId { get; set; }     
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }  
        public string description { get; set; }     
        public double rate { get; set; }         
    }
}