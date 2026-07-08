import { SearchFilters, SearchRepository } from "../repositories/search.repository";

export class SearchService {
  private repository = new SearchRepository();

  async search(filters: SearchFilters) {
    return this.repository.search(filters);
  }
}