import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Projects';
import { map, tap } from 'rxjs/operators';
import { StaticResponse } from '../models/StaticResponse';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private serviceEndpoint = 'http://localhost:5118/api/projects';
  projects$: Observable<Project[]>;

  projects: Project[];
  constructor(private httpClient: HttpClient) {
    this.projects = [];
    this.projects$ = this.getAllProjects();
  }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient
      .get<StaticResponse<Project>>(this.serviceEndpoint)
      .pipe(
        tap(({ data }) => {
          this.projects = data as Project[];
        }),
        map(({ data }) => data as Project[])
      );
  }

  getProject(id: string): Observable<Project> {
    return this.httpClient
      .get<StaticResponse<Project>>(`${this.serviceEndpoint}/${id}`)
      .pipe(map(({ data }) => data as Project));
  }

  createNewProject(
    {
      name,
      description,
      deadline,
    }: { name: string; description: string; deadline: string },
    clientId: string
  ): Observable<Project> {
    const currentDate = new Date();
    return this.httpClient.post<Project>(this.serviceEndpoint, {
      title: name,
      description,
      deadline,
      clientId: clientId.toString(),
      date: currentDate.toISOString(),
    });
  }
}
