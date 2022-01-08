namespace FreelancerNotebook.Models
{
    public class Response<T>
    {

        public Response(T data, string status )
        {
            Data = data;
            Status = status;
        }

        public string Status { get; set; } = string.Empty;
        public T Data { get; set; }
    }
}
