namespace FreelancerNotebook
{
    public class Projects
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime date { get; set; }
        public DateTime deadline { get; set; }        
        public int clientId { get; set; }
        public int user { get; set; }
    }
}