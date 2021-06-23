FROM mcr.microsoft.com/dotnet/aspnet:5.0 as base
WORKDIR /app
EXPOSE 80
ENV SecurityKey=

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --yes nodejs

WORKDIR /src
COPY ["Billing.WebApp.csproj", "./"]
RUN dotnet restore "Billing.WebApp.csproj"
COPY . .
RUN dotnet publish "Billing.WebApp.csproj" -c Release -o /app/publish

FROM base as final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Billing.WebApp.dll"]