package com.kbo.project.respository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.kbo.project.domain.Comment;
import com.kbo.project.dto.CommentList;
import com.kbo.project.dto.UpdateCommentLike;

public interface CommentRepository extends JpaRepository<Comment, Long>  {
	@Query("SELECT new com.kbo.project.dto.CommentList(b.commentNo, b.boardNo, b.userId, b.commentContent, b.commentLike, b.frsRgtDtm) FROM Comment b WHERE b.boardNo = :boardNo ORDER BY b.frsRgtDtm DESC")
	List<CommentList> findAllByBoardNoOrderByDateDesc(@Param("boardNo") long boardNo);

	@Transactional
	@Modifying
	@Query("UPDATE Comment b SET b.commentLike = :commentLike WHERE b.commentNo = :commentNo")
	int updateCommentLike(@Param("commentNo") long commentNo, @Param("commentLike") int commentLike );
}
