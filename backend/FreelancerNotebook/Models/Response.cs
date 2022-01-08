namespace FreelancerNotebook.Models
{
    public class Response<T>
    {

        public Response(string error)
        {
            Data = default;
            Error = error;
            Status = "fail";
        }
        public Response(T data, string status)
        {
            Data = data;
            Status = status;
            Error = null;
        }

        public string Status { get; set; } = string.Empty;
        public T? Data { get; set; }

        public string? Error {get; set;} = null;
    }
}
