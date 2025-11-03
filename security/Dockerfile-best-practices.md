# Dockerfile Best Practices

1. **Use small base images**  
   - Alpine, slim versions of official images.
2. **Pin versions**  
   - Example: `node:18-alpine` instead of `node:latest`.
3. **Use multi-stage builds**  
   - Build stage → runtime stage, reduces image size.
4. **Avoid secrets in images**  
   - Use GitHub Secrets, Azure Key Vault, or environment variables.
5. **Run as non-root**  
   - Create a user & group for production containers.
6. **Healthcheck**  
   - Add `HEALTHCHECK` for monitoring containers.
7. **Minimize layers**  
   - Combine RUN commands where possible.
8. **Install only necessary packages**  
   - Avoid extra tools in production images.
