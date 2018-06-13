namespace SimpleRaytracing
{

    public class Camera
    {
        public Vector forward;
        public Vector right;
        public Vector up;

        public Vector pos;
        public Vector lookAt;
        public Camera(Vector p, Vector l) {
            pos = p;
            lookAt = l;
            Vector down = new Vector(0.0F, -1.0F, 0.0F);
            this.forward = Vector.norm(Vector.minus(lookAt, this.pos));
            this.right = Vector.times(1.5F, Vector.norm(Vector.cross(this.forward, down)));
            this.up = Vector.times(1.5F, Vector.norm(Vector.cross(this.forward, this.right)));
        }
    }
}
