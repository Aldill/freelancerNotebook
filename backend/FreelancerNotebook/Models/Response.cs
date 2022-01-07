namespace FreelancerNotebook.Models
{
    public class Response<T>
    {

        public Response(List<T> data, string status )
        {
            Data = data;
            Status = status;
        }

        public string Status { get; set; } = string.Empty;
        public List<T> Data { get; set; } = null!;
    }
}
