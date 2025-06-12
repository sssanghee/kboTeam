package com.kbo.project.elasticsearch.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;

@Service
@SuppressWarnings("deprecation")
public class ElasticSearchService {

	private final RestHighLevelClient client;

    public ElasticSearchService(RestHighLevelClient client) {
        this.client = client;
    }

    public List<Map<String, Object>> searchByKeyword(String keyword) throws IOException {
        SearchRequest searchRequest = new SearchRequest("test_index");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
//      sourceBuilder.query(QueryBuilders.matchQuery("board_title", keyword));
        sourceBuilder.query(QueryBuilders.wildcardQuery("board_title", "*" + keyword + "*"));

        searchRequest.source(sourceBuilder);

        SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);

        List<Map<String, Object>> results = new ArrayList<>();
        for (SearchHit hit : response.getHits()) {
            results.add(hit.getSourceAsMap());
        }

        return results;
    }
}