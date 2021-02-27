import { Injectable } from '@angular/core';
import { TableColumnModel } from 'src/app/core/models/table-column.model';
import { TableFilterModel } from 'src/app/core/models/table-filter.model';
import { TeamCommunityModel } from 'src/app/core/models/team-community.model';
import { LoadLocationsService } from 'src/app/core/services/load-locations.service';

@Injectable({ providedIn: 'root' })
export class AssignedCommunityListDataService {

  public regionalDistrictList: string[] = ['All Regional Districts', 'd1', 'd2', 'Comox Valley'];
  public typesList: string[] = ['All Types', 'First Nations Community', 'City', 'IslandMunicipality'];
  private teamCommunityList: TeamCommunityModel[];
  private allTeamCommunityList: TeamCommunityModel[];
  private communitiesToDelete: TeamCommunityModel[];

  constructor(private loadLocationService: LoadLocationsService) { }

  public setCommunitiesToDelete(communitiesToDelete: TeamCommunityModel[]): void {
    this.communitiesToDelete = communitiesToDelete;
  }

  public getCommunitiesToDelete(): TeamCommunityModel[] {
    return this.communitiesToDelete;
  }

  public setTeamCommunityList(teamCommunityList: TeamCommunityModel[]): void {
    this.teamCommunityList = teamCommunityList;
  }

  public getTeamCommunityList(): TeamCommunityModel[] {
    return this.teamCommunityList;
  }

  public setAllTeamCommunityList(allTeamCommunityList: TeamCommunityModel[]): void {
    this.allTeamCommunityList = allTeamCommunityList;
  }

  public getAllTeamCommunityList(): TeamCommunityModel[] {
    return this.allTeamCommunityList;
  }

  public getCommunitiesToAddList(): TeamCommunityModel[] {
    let allCommunities = this.loadLocationService.getCommunityList();
    let conflictMap: TeamCommunityModel[] = allCommunities.map(values => {
      let conflicts = this.allTeamCommunityList.find(x => x.id === values.id);
      return this.mergeData(values, conflicts);
    });
    let addMap: TeamCommunityModel[] = conflictMap.map(values => {
      let existing = this.teamCommunityList.find(x => x.id === values.id);
      return this.mergeData(values, existing);
    });
    return addMap;
  }

  private mergeData<T>(finalValue: T, incomingValue: Partial<T>): T {
    return { ...finalValue, ...incomingValue };
  }

  public filtersToLoad: TableFilterModel = {
    loadDropdownFilters: [{
      type: 'regionalDistrict',
      label: 'All Regional Districts',
      values: this.regionalDistrictList
    },
    {
      type: 'type',
      label: 'All Types',
      values: this.typesList
    }],
    loadInputFilter: {
      type: 'Search by city, town, village or community',
      label: 'Search by city, town, village or community'
    }
  }

  public displayedColumns: TableColumnModel[] = [
    { label: 'select', ref: 'select' },
    { label: 'Community', ref: 'name' },
    { label: 'Regional District', ref: 'districtName' },
    { label: 'Type', ref: 'type' },
    { label: 'Date Added to List', ref: 'date' },
  ];

}
